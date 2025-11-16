from flask import Blueprint, jsonify, current_app

results_bp = Blueprint('results', __name__, url_prefix='/api')

@results_bp.route('/results/<uuid>', methods=['GET'])
def get_results(uuid):
    try:
        # 1. Query the database for the matching ID
        response = current_app.supabase.table('flotector-data') \
            .select('result_url', 'class_count') \
            .eq('id', uuid) \
            .single() \
            .execute()

        # 2. Check if data was found
        if not response.data:
            return jsonify({"error": "Results not found"}), 404
        
        # 3. Return the data to the frontend
        return jsonify(response.data), 200

    except Exception as e:
        print(f"An error occurred fetching results: {e}")
        return jsonify({"error": str(e)}), 500