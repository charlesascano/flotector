from flask import Blueprint, jsonify, current_app, request
from datetime import datetime, timedelta

map_bp = Blueprint('map_bp', 
                   __name__, 
                   url_prefix='/api')

@map_bp.route('/markers', methods=['GET'])
def get_markers():
    try:
        supabase = current_app.supabase
        filter_option = request.args.get('filter', 'all') # Default to 'all'
        
        query = supabase.table('flotector-data').select("id, lat, lng, created_at, total_count")

        # --- Date Filtering Logic ---
        now = datetime.now()

        if filter_option == 'today':
            start_of_day = now.replace(hour=0, minute=0, second=0, microsecond=0)
            query = query.gte('created_at', start_of_day.isoformat())
        
        elif filter_option == 'this week':
            seven_days_ago = now - timedelta(days=7)
            query = query.gte('created_at', seven_days_ago.isoformat())

        elif filter_option == 'this month':
            thirty_days_ago = now - timedelta(days=30)
            query = query.gte('created_at', thirty_days_ago.isoformat())
        
        elif filter_option == 'custom':
            start_date = request.args.get('start')
            end_date = request.args.get('end')
            if start_date and end_date:
                query = query.gte('created_at', start_date).lte('created_at', end_date)

        # For 'all', don't add any date filters.

        response = query.execute()
        
        if response.data:
            return jsonify(response.data), 200
        else:
            # Return an empty array, not an error, if no data matches the filter
            return jsonify([]), 200

    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500