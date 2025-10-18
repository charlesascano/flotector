from flask import Blueprint, request, jsonify, current_app
from PIL import Image, ImageOps
import cv2
import io
import requests
from ultralytics import YOLO
from .utils import load_model

bp = Blueprint('routes', __name__)

# Load YOLO model once
load_model()
model = YOLO('./model/best.pt')

def get_image_from_url(image_url):
    # Fetch image from URL
    response = requests.get(image_url)
    img = Image.open(io.BytesIO(response.content))
    # Correct image orientation based on EXIF metadata
    img = ImageOps.exif_transpose(img)
    return img
    

def upload_image_to_supabase(image, filename):
    # Encode to JPEG
    success, buffer = cv2.imencode('.jpg', image)
    if not success:
        raise Exception("Failed to encode image to JPEG.")
    image_bytes = buffer.tobytes()

    # Upload image to Supabase storage
    storage = current_app.supabase.storage
    file_path = f"Detections/{filename}.jpg"
    try:
        storage.from_("flotector-media").upload(file_path, image_bytes)
    except Exception as e:
        raise Exception(f"Image upload to Supabase failed: {e}")


@bp.route('/process/<uid>', methods=['POST'])
def process_image(uid):
    # Fetch entry from Supabase
    response = current_app.supabase.table('flotector-data').select('*').eq('id', uid).execute()
    if not response.data:
        return jsonify({"error": "UID not found"}), 404

    entry = response.data[0]
    image_url = entry['image_url']

    # Download image
    image = get_image_from_url(image_url)
    print("Image received from Supabase")

    # Run YOLO model
    results = model(image)
    annotated_image = results[0].plot()
    
    # Count detections
    total_count = len(results[0].boxes)
    class_count = {}  # Dictionary to store the count for each class

    for detection in results[0].boxes:
        class_label = detection.cls  # Get the class label for the detection
        class_name = model.names[int(class_label)]  # Convert the class label to the class name
        
        if class_name not in class_count:
            class_count[class_name] = 1
        else:
            class_count[class_name] += 1

    # Upload annotated image
    annotated_filename = f"{uid}-Annotated"
    print("Uploading results to storage")
    upload_image_to_supabase(annotated_image, annotated_filename)

    # Update Supabase table
    update_response = current_app.supabase.table('flotector-data').update({
        'result_url': annotated_filename,
        'class_count': class_count,
        'total_count': total_count
    }).eq('id', uid).execute()

    # Get public URL of the uploaded image from 'Detections/' folder
    storage = current_app.supabase.storage
    file_path = f"Detections/{annotated_filename}.jpg"
    result_url = storage.from_("flotector-media").get_public_url(file_path)

    # Return the public URL of the annotated image
    return jsonify({"result_url": result_url}), 200