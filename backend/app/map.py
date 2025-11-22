from flask import Blueprint, jsonify, current_app, request
from datetime import datetime, timedelta

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
            return jsonify(response.data), 200
        else:
            return jsonify([]), 200

    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500