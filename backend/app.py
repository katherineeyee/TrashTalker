from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import numpy as np
import cv2
import os
import base64

app = Flask(__name__)
CORS(app) # Enable CORS for all routes  

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

model = None

# Enhanced waste classification mapping with more items
waste_categories = {
    # Plastics
    'bottle': 'Plastic',
    'cup': 'Plastic',
    'plastic bag': 'Plastic',
    'container': 'Plastic',
    'plastic bottle': 'Plastic',
    'plastic container': 'Plastic',
    
    # Metals
    'can': 'Metal',
    'aluminum can': 'Metal',
    'tin can': 'Metal',
    'metal container': 'Metal',
    
    # Paper
    'paper': 'Paper',
    'cardboard': 'Paper',
    'box': 'Paper',
    'newspaper': 'Paper',
    'magazine': 'Paper',
    'carton': 'Paper',
    
    # Glass
    'glass': 'Glass',
    'glass bottle': 'Glass',
    'wine bottle': 'Glass',
    'beer bottle': 'Glass',
    'jar': 'Glass',
    
    # Electronics
    'battery': 'Batteries',
    'electronics': 'Electronics',
    'phone': 'Electronics',
    'computer': 'Electronics',
    'laptop': 'Electronics',
    'keyboard': 'Electronics',
    'mouse': 'Electronics',
    
    # Compost
    'food': 'Compost',
    'fruit': 'Compost',
    'vegetable': 'Compost',
    
    # Other categories
    'vase': 'Glass',  # YOLO often confuses bottles and vases
    'bowl': 'Glass',
    'wine glass': 'Glass',
    'toilet': 'Other',  # Explicitly categorize toilet as Other
}

def get_model():
    global model
    if model is None:
        print("Loading YOLOv8 model...")
        model = YOLO("yolov8n.pt")  
        print("Model loaded successfully!")
    return model


    
    # Improve existing detections
    for det in detections:
        class_name = det["class_name"]
        confidence = det["confidence"]
       
    return detections

@app.route('/')
def index():
    return jsonify({"message": "YOLOv8 Recyclable Item Detection API"})

@app.route('/health')
def health_check():
    return jsonify({"status": "ok"})

@app.route('/detect', methods=['POST'])
def detect():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Create a unique filename to avoid conflicts
    import uuid
    unique_filename = str(uuid.uuid4()) + os.path.splitext(file.filename)[1]
    filepath = os.path.join(UPLOAD_FOLDER, unique_filename)
    
    try:
        # Save the uploaded file
        file.save(filepath)
        print(f"File saved to {filepath}")
        
        # Read the image with OpenCV
        img_array = cv2.imread(filepath)
        if img_array is None:
            return jsonify({"error": f"Failed to read image: {filepath}"}), 500
        
        # Get the model and run inference with a lower confidence threshold
        model = get_model()
        results = model(img_array, conf=0.25)  # Lower threshold to catch more objects
        
        # Process the results
        detections = []
        for r in results:
            boxes = r.boxes
            for box in boxes:
                # Get box coordinates
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                
                # Get confidence score
                confidence = float(box.conf[0])
                
                # Get class ID and name
                class_id = int(box.cls[0])
                class_name = r.names[class_id]
                

                # Map to waste category
                waste_type = waste_categories.get(class_name, 'Other')
                
                # Add detection to list
                detections.append({
                    "class_name": class_name,
                    "waste_type": waste_type,
                    "confidence": confidence,
                    "box": [x1, y1, x2, y2]
                })
        
        # Draw boxes on the image
        img_with_boxes = img_array.copy()
        for det in detections:
            x1, y1, x2, y2 = det["box"]
            
            # Color based on waste type
            color_map = {
                'Glass': (0, 255, 0),    # Green
                'Plastic': (0, 255, 255), # Yellow
                'Metal': (255, 0, 0),    # Blue
                'Paper': (0, 165, 255),  # Orange
                'Batteries': (128, 0, 128), # Purple
                'Electronics': (255, 0, 255), # Magenta
                'Compost': (0, 128, 0),  # Dark Green
                'Other': (128, 128, 128) # Gray
            }
            color = color_map.get(det['waste_type'], (0, 255, 0))
            
            cv2.rectangle(img_with_boxes, (x1, y1), (x2, y2), color, 2)
            
            # Add more informative label
            confidence_pct = f"{det['confidence']:.1%}"
            label = f"{det['class_name']} ({det['waste_type']}): {confidence_pct}"
            
            # Add background to text for better visibility
            text_size = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 2)[0]
            cv2.rectangle(img_with_boxes, (x1, y1 - 20), (x1 + text_size[0], y1), color, -1)
            cv2.putText(img_with_boxes, label, (x1, y1 - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2)
            
            # Add note if available
            if 'note' in det:
                note_y = y1 - 25
                cv2.putText(img_with_boxes, det['note'], (x1, note_y), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0, 0, 0), 1)
        
        # Save the result image
        result_path = os.path.join(UPLOAD_FOLDER, "result_" + unique_filename)
        cv2.imwrite(result_path, img_with_boxes)
        
        # Convert result image to base64 for the response
        with open(result_path, "rb") as img_file:
            encoded_img = base64.b64encode(img_file.read()).decode('utf-8')
        
        # Clean up files
        os.remove(filepath)
        os.remove(result_path)
        
        # Return results
        return jsonify({
            "success": True,
            "detections": detections,
            "image_with_detections": encoded_img
        })
    
    except Exception as e:
        # Clean up files if they exist
        if os.path.exists(filepath):
            os.remove(filepath)
        
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

# For compatibility with  original API
@app.route('/predict', methods=['POST'])
def predict_route():
    return detect()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)
