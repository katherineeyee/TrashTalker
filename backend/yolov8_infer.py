# yolov8_infer.py

from ultralytics import YOLO
import cv2
import numpy as np

# Load YOLOv8 model once (singleton pattern)
model = None

def get_model():
    global model
    if model is None:
        model = YOLO("yolov8n.pt")  # You can replace with your custom model path
    return model

# Waste classification mapping
waste_categories = {
    'bottle': 'Plastic',
    'cup': 'Plastic',
    'can': 'Metal',
    'paper': 'Paper',
    'cardboard': 'Paper',
    'glass': 'Glass',
    'plastic bag': 'Plastic',
    'box': 'Paper',
    'container': 'Plastic',
    'battery': 'Batteries',
    'electronics': 'Electronics',
    'phone': 'Electronics',
    'computer': 'Electronics',
    'food': 'Compost'
}

# Default category for unrecognized items
DEFAULT_CATEGORY = 'Other'

def predict(image_path):
    """
    Run YOLOv8 prediction on the image and return formatted results
    
    Args:
        image_path: Path to the input image
        
    Returns:
        Dictionary with detection results
    """
    # Get model instance
    model = get_model()
    
    # Read image
    img = cv2.imread(image_path)
    if img is None:
        return {"error": f"Could not read image at {image_path}"}
    
    # Run inference
    results = model(img)
    
    # Process results
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
            waste_type = waste_categories.get(class_name, DEFAULT_CATEGORY)
            
            # Add detection to list
            detections.append({
                "class_name": class_name,
                "waste_type": waste_type,
                "confidence": confidence,
                "box": [x1, y1, x2, y2]
            })
    
    # Prepare result image with bounding boxes
    result_img = img.copy()
    for det in detections:
        x1, y1, x2, y2 = det["box"]
        cv2.rectangle(result_img, (x1, y1), (x2, y2), (0, 255, 0), 2)
        label = f"{det['class_name']} ({det['waste_type']}): {det['confidence']:.2f}"
        cv2.putText(result_img, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
    
    # Save result image
    result_path = image_path.replace(".", "_result.")
    cv2.imwrite(result_path, result_img)
    
    # Group detections by waste type
    waste_types = {}
    for det in detections:
        waste_type = det["waste_type"]
        if waste_type not in waste_types:
            waste_types[waste_type] = []
        waste_types[waste_type].append(det)
    
    return {
        "success": True,
        "detections": detections,
        "waste_types": waste_types,
        "result_image": result_path
    }