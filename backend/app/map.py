from flask import Blueprint, jsonify, current_app, request
from datetime import datetime, timedelta
import random

map_bp = Blueprint('map_bp', 
                   __name__, 
                   url_prefix='/api')

@map_bp.route('/markers', methods=['GET'])
def get_markers():
    try:
        supabase = current_app.supabase
        
        # 1. CHANGED: Accept specific dates instead of a 'filter' string
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        
        query = supabase.table('flotector-data').select("id, lat, lng, created_at, total_count")

        # 2. CHANGED: Simplified logic. Just apply range if params exist.
        if start_date:
            query = query.gte('created_at', start_date)
        
        if end_date:
            # IMPORTANT: Append time to end_date to ensure we get the whole day
            # '2025-11-22' becomes '2025-11-22 23:59:59'
            query = query.lte('created_at', f"{end_date} 23:59:59")

        response = query.execute()
        
        if response.data:
            markers = response.data
            
            # --- SMART UNIQUE JITTER LOGIC ---
            jit_offset = 0.00001
            
            # 1. Create a Set to track coordinates we have already used
            # Sets allow O(1) instant lookup, making this very efficient
            occupied_locations = set()

            for marker in markers:
                # Get original coordinates
                base_lat = float(marker['lat'])
                base_lng = float(marker['lng'])
                
                # Temp variables for calculation
                curr_lat = base_lat
                curr_lng = base_lng
                
                # 2. Collision Loop
                # We round to 6 decimals (approx 11cm) to ensure floats match correctly in the Set
                # If this coordinate is already taken, keep jittering until it's free
                attempt_count = 0
                while (round(curr_lat, 6), round(curr_lng, 6)) in occupied_locations:
                    # Apply random jitter to the BASE coordinates
                    # (We use base to keep them clustering around the center, not walking away)
                    curr_lat = base_lat + (random.uniform(-1, 1) * jit_offset)
                    curr_lng = base_lng + (random.uniform(-1, 1) * jit_offset)
                    # Safety break just in case of infinite loop (rare)
                    attempt_count += 1
                    if attempt_count > 50: 
                        break
                # 3. Register this new spot as "Occupied"
                occupied_locations.add((round(curr_lat, 6), round(curr_lng, 6)))
                # 4. Assign to marker
                marker['lat'] = curr_lat
                marker['lng'] = curr_lng
            return jsonify(markers), 200
        else:
            return jsonify([]), 200

    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500