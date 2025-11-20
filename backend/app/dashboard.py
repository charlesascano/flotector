import json
from flask import Blueprint, current_app, jsonify, request
from datetime import datetime
from postgrest.exceptions import APIError

dashboard_bp = Blueprint('dashboard_bp', __name__, url_prefix='/api/dashboard')


def execute_dashboard_query(app, start_date, end_date):
    try:
        response = app.supabase.rpc('get_dashboard_data', {
            'start_date_param': start_date.isoformat(),
            'end_date_param': end_date.isoformat()
        }).execute()

        # Debug log
        current_app.logger.info(f"Supabase raw response: {response.data}")

        # Case 1: response.data is a list (old behavior)
        if isinstance(response.data, list) and response.data:
            data_raw = response.data[0]
            if isinstance(data_raw, str):
                return json.loads(data_raw)
            return data_raw

        # Case 2: response.data is already a dict (new behavior)
        if isinstance(response.data, dict):
            return response.data

        # Fallback: empty dict
        current_app.logger.warning("Supabase returned empty or unexpected data type")
        return {}

    except APIError as e:
        current_app.logger.error(f"Supabase API Error: {e.message}")
        raise
    except Exception as e:
        current_app.logger.error(f"General Query Error: {e}")
        raise


@dashboard_bp.route('/summary', methods=['GET'])
def get_dashboard_summary():
    start_date_str = request.args.get('startDate')
    end_date_str = request.args.get('endDate')

    if not start_date_str or not end_date_str:
        return jsonify({"error": "Missing startDate or endDate parameter"}), 400

    try:
        start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date()
        end_date = datetime.strptime(end_date_str, '%Y-%m-%d').date()
    except ValueError:
        return jsonify({"error": "Date format must be YYYY-MM-DD"}), 400

    try:
        # --- 1️⃣ Fetch the dashboard data ---
        data = execute_dashboard_query(current_app, start_date, end_date)

        # --- 2️⃣ Transform top_hotspots into city objects with topBarangays ---
        if "top_hotspots" in data:
            grouped_by_city = {}
            for h in data.get("top_hotspots", []):
                city_name = h.get("city")
                if not city_name:
                    continue
                if city_name not in grouped_by_city:
                    grouped_by_city[city_name] = {
                        "name": city_name,
                        "value": 0,
                        "topBarangays": []
                    }
                detections = h.get("detections", 0) or 0
                grouped_by_city[city_name]["value"] += detections
                grouped_by_city[city_name]["topBarangays"].append({
                    "name": h.get("barangay", "Unknown"),
                    "reports": detections
                })

            # Sort topBarangays descending and keep top 5
            for city in grouped_by_city.values():
                city["topBarangays"] = sorted(city["topBarangays"], key=lambda x: x["reports"], reverse=True)[:5]

            data["top_hotspots"] = list(grouped_by_city.values())

            # Optionally: sort topBarangays descending and keep top 5 only
            for city in grouped_by_city.values():
                city["topBarangays"] = sorted(city["topBarangays"], key=lambda x: x["reports"], reverse=True)[:5]

            # Replace the flat top_hotspots with the grouped array
            data["top_hotspots"] = list(grouped_by_city.values())

        # --- 3️⃣ Debug log ---
        current_app.logger.info(f"Returning dashboard data: {data}")

        return jsonify({"data": data}), 200

    except Exception as e:
        current_app.logger.error(f"Failed to retrieve dashboard data: {e}")
        return jsonify({"error": "Failed to retrieve dashboard data."}), 500

