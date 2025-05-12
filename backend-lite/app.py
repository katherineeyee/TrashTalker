from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import numpy as np
import torch
import os
import uuid
from PIL import Image

# Print versions for debugging
print("NumPy:", np.__version__)
print("Torch:", torch.__version__)

# Create Flask application
app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from the frontend

# Configuration
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load the YOLO model
model = YOLO("yolov8m.pt")  # Using medium model for better accuracy

# Step 1: YOLO label → categories mapping
label_to_subcategory = {
    # Recyclables
    "bottle": "Plastic",
    "can": "Metal",
    "cup": "Paper",
    "box": "Paper",
    "glass": "Glass",
    "vase": "Glass",
    
    # Compostables
    "apple": "Compost",
    "banana": "Compost",
    "orange": "Compost",
    "carrot": "Compost",
    "broccoli": "Compost",
    
    # Special handling
    "phone": "Electronics",
    "tv": "Electronics",
    "laptop": "Electronics",
    "keyboard": "Electronics",
    "mouse": "Electronics",
    
    "battery": "Batteries",
    
    "shoe": "Rubber",
    "boot": "Rubber",
}

# Step 2: Subcategory to final bin mapping
subcategory_to_main = {
    "Plastic": "Recycle",
    "Metal": "Recycle",
    "Glass": "Recycle",
    "Paper": "Recycle",
    "Compost": "Compost",
    "Electronics": "Landfill",
    "Batteries": "Landfill",
    "Rubber": "Landfill"
}

@app.route('/health')
def health_check():
    """Check if the server is running"""
    return jsonify({"status": "ok"})

@app.route('/predict', methods=['POST'])
def predict():
    # Check if a file was uploaded
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
        
    file = request.files['file']
    
    # Create a unique filename
    unique_id = str(uuid.uuid4())
    file_extension = os.path.splitext(file.filename)[1] or ".jpg"
    filename = unique_id + file_extension
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    
    try:
        # Save the uploaded file
        file.save(filepath)
        
        # Run object detection
        results = model(filepath, conf=0.25)  # 25% confidence threshold
        
        # Find the object with highest confidence
        top_object = None
        top_confidence = 0
        
        for result in results:
            if not result.boxes:
                continue
                
            boxes = result.boxes
            confidences = boxes.conf.tolist()
            classes = boxes.cls.tolist()
            names = result.names
            
            # Find object with highest confidence
            for i, (conf, cls) in enumerate(zip(confidences, classes)):
                if conf > top_confidence:
                    top_confidence = conf
                    class_id = int(cls)
                    top_object = names[class_id]
        
        # Clean up the uploaded file
        os.remove(filepath)
        
        # Handle case where no object is detected
        if not top_object:
            return jsonify({
                'success': False,
                'error': 'No object detected'
            })
        
        # Get category for the top object
        sub_category = label_to_subcategory.get(top_object.lower(), "Unknown")
        main_category = subcategory_to_main.get(sub_category, "Landfill")
        
        return jsonify({
            "success": True,
            "object": top_object,
            "subCategory": sub_category,
            "mainCategory": main_category,
            "confidence": float(top_confidence)
        })
    
    except Exception as e:
        # Clean up on error
        if os.path.exists(filepath):
            os.remove(filepath)
            
        import traceback
        traceback.print_exc()
        
        return jsonify({"error": str(e)}), 500

# Start the Flask application
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)