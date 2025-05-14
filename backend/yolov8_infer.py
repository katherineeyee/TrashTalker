# yolov8_infer.py

from ultralytics import YOLO

# model load
model = YOLO("yolov8n.pt")  # pretrained model

def predict(image_path):
    results = model(image_path)
    detections = []

    for result in results:
        for box in result.boxes.data.tolist():
            x1, y1, x2, y2, score, class_id = box
            detections.append({
                "class": model.names[int(class_id)],
                "confidence": round(score, 2)
            })

    return detections
