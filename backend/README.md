# Backend Lite

This is a lightweight version of the backend for the waste classification application , ignore the venv files and caches

## Features

- Object detection using YOLOv8
- Classification of waste items into appropriate disposal categories
- RESTful API for image processing

## Setup

1. Install dependencies:

   ```
   pip install -r requirements.txt
   ```

2. Run the server:
   ```
   python app.py
   ```

## API Endpoints

- `GET /health` - Health check endpoint
- `POST /predict` - Upload an image for object detection and waste classification

## Notes

This is a simplified version that only returns the top detected object without image annotations.
