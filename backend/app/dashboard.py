import json
from flask import Blueprint, current_app, jsonify, request
from datetime import datetime
from postgrest.exceptions import APIError
from datetime import date # Import date for clearer type hints

# Create the Blueprint for dashboard routes
dashboard_bp = Blueprint('dashboard_bp', __name__, url_prefix='/api/dashboard')

def execute_dashboard_query(app, start_date: date, end_date: date):
    # ... (docstring and rpc_name definition remain the same) ...
    rpc_name = 'get_master_dashboard_data'

    try:
        # ... (params definition remains the same) ...
        params = {
            'start_date_param': start_date.isoformat(),
            'end_date_param': end_date.isoformat()
        }

        response = app.supabase.rpc(rpc_name, params).execute()
        data = response.data

        # --- CHANGED SECTION STARTS HERE ---
        
        # 1. Debug print to see exactly what Supabase is returning
        # print(f"DEBUG RPC {rpc_name} RAW DATA: {data}")

        # 2. Handle both List (PostgREST standard) and Dict (Single Composite Return)
        if data:
            # Case A: It returns a list (e.g., [{...}])
            if isinstance(data, list) and len(data) > 0:
                return data[0]
            
            # Case B: It returns the object directly (e.g., {...}) -> THIS IS LIKELY YOUR ISSUE
            elif isinstance(data, dict):
                return data

        # --- CHANGED SECTION ENDS HERE ---

        app.logger.warning(f"RPC '{rpc_name}' returned no data for range {start_date} to {end_date}.")
        return {}

    except APIError as e:
        # Handle errors reported by PostgREST (Supabase)
        error_message = f"Supabase API Error calling {rpc_name}: {e.message}"
        app.logger.error(error_message)
        # Return an error tuple for Flask to jsonify and set the status code
        return {'error': error_message}, 500
    except Exception as e:
        # Handle unexpected Python errors (e.g., Supabase client not configured)
        error_message = f"An unexpected error occurred while executing {rpc_name}: {e}"
        app.logger.error(error_message)
        return {'error': 'Internal server error'}, 500


@dashboard_bp.route('/waste-analytics', methods=['GET'])
def get_dashboard_data():
    """
    API endpoint to retrieve master dashboard data.
    Requires 'start_date' and 'end_date' query parameters in YYYY-MM-DD format.
    """
    start_date_str = request.args.get('start_date')
    end_date_str = request.args.get('end_date')

    # Input validation: check for required parameters
    if not start_date_str or not end_date_str:
        return jsonify({
            'error': 'Missing required query parameters: start_date and end_date. Format must be YYYY-MM-DD.'
        }), 400

    try:
        # Input validation: parse dates
        start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date()
        end_date = datetime.strptime(end_date_str, '%Y-%m-%d').date()
    except ValueError:
        return jsonify({'error': 'Invalid date format. Please ensure dates are in YYYY-MM-DD format.'}), 400

    # Execute the query helper function
    result = execute_dashboard_query(current_app, start_date, end_date)
    # print(f"test: {result}")
    result2 = execute_dashboard_query(
        current_app,
        datetime.strptime('2025-05-13', '%Y-%m-%d').date(),
        datetime.strptime('2025-05-13', '%Y-%m-%d').date()
    )

    # print(f"awooga: {result2}")
    # Check if the result is an error tuple
    if isinstance(result, tuple) and len(result) == 2 and 'error' in result[0]:
        # Error tuple format: ({'error': '...'}, status_code)
        return jsonify(result[0]), result[1]
    
    
    # Success: return the data
    return jsonify(result), 200

# Daily submissions
def execute_daily_submissions_query(app, start_date, end_date):
    """
    Executes the get_daily_submissions RPC.
    """
    try:
        # 1. Prepare parameters using ISO format strings
        params = {
            'start_date_param': start_date.isoformat(),
            'end_date_param': end_date.isoformat()
        }
        
        # 2. Call the specific RPC for daily submissions
        response = app.supabase.rpc('get_submissions_summary', params).execute()
        print(f"daslkdjaslkdjasdkls LMAO || KNAI | ASD: {response}")

        # The result of a function that RETURNS TABLE is typically a list of dicts.
        return response.data

    except APIError as e:
        current_app.logger.error(f"Supabase API Error for daily submissions: {e.message}")
        raise
    except Exception as e:
        current_app.logger.error(f"General Query Error for daily submissions: {e}")
        raise
@dashboard_bp.route('/submissions', methods=['GET'])
def get_daily_submissions_route():
    """
    API endpoint to fetch daily submission counts within a date range.
    Expected URL: /api/dashboard/submissions?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
    """
    start_date_str = request.args.get('start_date')
    end_date_str = request.args.get('end_date')

    if not start_date_str or not end_date_str:
        return jsonify({"error": "Missing startDate or endDate parameter"}), 400

    try:
        # Convert string dates to datetime.date objects for the RPC call
        start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date()
        end_date = datetime.strptime(end_date_str, '%Y-%m-%d').date()
    except ValueError:
        return jsonify({"error": "Date format must be YYYY-MM-DD"}), 400

    try:
        # Call the new execution function
        daily_data = execute_daily_submissions_query(current_app, start_date, end_date)

        # 3. Format the data for a clean response (optional, but recommended)
        # The data will be a list of dictionaries like: 
        # [{'submission_date': '2025-01-01', 'submission_count': 10}, ...]

        current_app.logger.info(f"Returning daily submissions data: {daily_data}")
        
        return jsonify({"data": daily_data}), 200

    except Exception:
        # The exception is already logged in the execute function
        return jsonify({"error": "Failed to retrieve daily submission data."}), 500