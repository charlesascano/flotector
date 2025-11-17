from flask import Blueprint, jsonify, current_app

map_bp = Blueprint('map_bp', __name__, url_prefix='/api')

@map_bp.route('/markers', methods=['GET'])
def get_markers():
    try:
        supabase = current_app.supabase
        
        # Fetch data
        response = supabase.table('flotector-data').select("id, lat, lng").execute()
        
        if response.data:
            return jsonify(response.data), 200
        else:
            return jsonify({"error": "No data found", "details": response.error}), 404

    except Exception as e:
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500