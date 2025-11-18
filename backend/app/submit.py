from flask import Blueprint, request, jsonify, current_app
from PIL import Image, ImageOps
import cv2
from ultralytics import YOLO
from .load_model import load_model
import uuid
from datetime import datetime

submit_bp = Blueprint('submit', __name__, url_prefix='/api')

# Load YOLO model once
load_model()
model = YOLO('./model/best.pt')

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
            'uploaded_at': datetime.now().isoformat(),
            'lat': lat,
            'lng': lng,
            'file_name': file_name,
            'image_url': image_url,
            'result_url': None
        }).execute()

        # 5. Process the image (Run YOLO model)
        file.seek(0) 
        image = Image.open(file.stream)
        image = ImageOps.exif_transpose(image)
        
        results = model(image, agnostic_nms=True)
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