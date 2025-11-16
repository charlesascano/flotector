from flask import Blueprint, jsonify, current_app, request

data_bp = Blueprint('data', __name__, url_prefix='/api')

@data_bp.route('/data', methods=['GET'])
def get_paginated_data():
    try:
        # 1. Get 'page' and 'limit' from query parameters
        page = request.args.get('page', 1, type=int)
        limit = request.args.get('limit', 10, type=int)

        # 2. Calculate the 'from' and 'to' range for Supabase (0-indexed, inclusive)
        range_from = (page - 1) * limit
        range_to = range_from + limit - 1

        # 3. Query Supabase
        response = current_app.supabase.table('flotector-data') \
            .select('*', count='exact') \
            .order('uploaded_at', desc=True) \
            .range(range_from, range_to) \
            .execute()

        # Handle empty data case
        if not response.data:
            return jsonify({"data": [], "totalCount": 0}), 200

        # 4. Return the paginated data and the total count
        return jsonify({
            "data": response.data,
            "totalCount": response.count
        }), 200

    except Exception as e:
        print(f"An error occurred fetching paginated data: {e}")
        return jsonify({"error": str(e)}), 500