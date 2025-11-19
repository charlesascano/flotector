from flask import Blueprint, request, jsonify, current_app
from PIL import Image, ImageOps
import cv2
from ultralytics import YOLO
from .load_model import load_model
import uuid
from datetime import datetime
import requests
import os

# for .heic support
from pillow_heif import register_heif_opener
register_heif_opener()

submit_bp = Blueprint('submit', __name__, url_prefix='/api')

# Load YOLO model once
load_model()
model = YOLO('./model/best.pt')

def get_parsed_address(lat, lng):
    TOKEN = os.getenv("MAPBOX_SECRET_TOKEN")
    
    # Basic validation: if no token or coordinates, return None/empty
    if not TOKEN or lat is None or lng is None:
        return {
            "address": "Location unavailable",
            "barangay": None, 
            "city": None,
            "province": None
        }

    # Mapbox API Call
    url = f"https://api.mapbox.com/geocoding/v5/mapbox.places/{lng},{lat}.json"
    params = {
        "access_token": TOKEN, 
        "types": "address,poi,place,locality,region", 
        "limit": 1
    }

    try:
        response = requests.get(url, params=params)
        data = response.json()
        
        if not data.get('features'):
            return {
                "address": "Address not found", 
                "barangay": None, 
                "city": None, 
                "province": None
            }

        feature = data['features'][0]
        
        # Initialize our dict with the full readable string
        parsed_data = {
            "address": feature.get('place_name', "Unknown Location"),
            "barangay": None,
            "city": None,
            "province": None
        }

        # Loop through context from Mapbox to find parts
        for part in feature.get('context', []):
            part_type = part['id'].split('.')[0]
            
            if part_type == 'locality':
                parsed_data['barangay'] = part['text']
            
            elif part_type == 'place':
                parsed_data['city'] = part['text']

            elif part_type == 'region':
                parsed_data['province'] = part['text']
        
        return parsed_data

    except Exception as e:
        print(f"Mapbox API error: {e}")
        return {
            "address": "Address lookup failed", 
            "barangay": None, 
            "city": None, 
            "province": None
        }

@submit_bp.route('/submit', methods=['POST'])
def submit_and_process():
    try:
        # 1. Get file and form data from the frontend
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400
        
        file = request.files['file']
        
        # Get EXIF data from form
        created_at = request.form.get('createdAt', datetime.now().isoformat())
        lat_str = request.form.get('lat')
        lng_str = request.form.get('lng')
        file_name = request.form.get('fileName', file.filename)

        # Convert lat/lng, handle errors
        try:
            lat = float(lat_str) if lat_str and lat_str != 'null' else None
        except (ValueError, TypeError):
            lat = None

        try:
            lng = float(lng_str) if lng_str and lng_str != 'null' else None
        except (ValueError, TypeError):
            lng = None

        # Fetch address data (reverse geocoding)
        location_data = get_parsed_address(lat, lng)

        # Imus River location constraints
        if location_data['city'] not in ['Amadeo', 'Bacoor', 'Dasmariñas', 'Imus', 'Kawit', 'Silang', 'Tagaytay City', 'Tagaytay']:
            error_message = f"Location '{location_data['city']}' is outside the Imus River monitoring service zone."
            return jsonify({"error": error_message}), 400
        
        # 2. Generate UUID
        new_uuid = str(uuid.uuid4())

        # 3. Upload ORIGINAL image to Supabase Storage
        storage = current_app.supabase.storage

        upload_path = f"Original/{new_uuid}"
        file_bytes = file.read()
        storage.from_("flotector-media").upload(upload_path, file_bytes, {
            "content-type": file.content_type
        })
        
        image_url_data = storage.from_("flotector-media").get_public_url(upload_path)
        image_url = image_url_data

        # 4. Insert INITIAL record into Supabase table
        current_app.supabase.table('flotector-data').insert({
            'id': new_uuid,
            'created_at': created_at,
            'lat': lat,
            'lng': lng,
            'file_name': file_name,
            'image_url': image_url,
            'result_url': None,
            'address': location_data['address'],
            'barangay': location_data['barangay'],
            'city': location_data['city'],
            'province': location_data['province']
        }).execute()

        # 5. Process the image (Run YOLO model)
        file.seek(0) 
        image = Image.open(file.stream)
        image = ImageOps.exif_transpose(image)
        
        results = model(image, agnostic_nms=True, iou=0.25)
        annotated_image = results[0].plot()
        
        # Count detections
        total_count = len(results[0].boxes)
        class_count = {}
        for detection in results[0].boxes:
            class_label = detection.cls
            class_name = model.names[int(class_label)]
            class_count[class_name] = class_count.get(class_name, 0) + 1

        # 6. Upload ANNOTATED image
        success, buffer = cv2.imencode('.jpg', annotated_image)
        if not success:
            raise Exception("Failed to encode annotated image to JPEG.")
        
        annotated_upload_path = f"Annotated/{new_uuid}.jpg"
        annotated_image_bytes = buffer.tobytes()
        try:
            storage.from_("flotector-media").upload(annotated_upload_path, annotated_image_bytes, {
                "content-type": "image/jpeg"
            })
        except Exception as e:
            raise Exception(f"Annotated image upload to Supabase failed: {e}")

        # 7. Get public URL for annotated image
        result_url_data = storage.from_("flotector-media").get_public_url(annotated_upload_path)
        result_url = result_url_data

        # 8. UPDATE the record with results
        current_app.supabase.table('flotector-data').update({
            'result_url': result_url,
            'class_count': class_count,
            'total_count': total_count
        }).eq('id', new_uuid).execute()

        # 9. Return the final response to the frontend
        return jsonify({
            "uuid": new_uuid,
            "result_url": result_url
        }), 200

    except Exception as e:
        print(f"An error occurred: {e}") # Print error to backend console
        return jsonify({"error": str(e)}), 500