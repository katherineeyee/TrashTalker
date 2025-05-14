# Project Title

> TrashTalker

---

## Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [How to Run](#how-to-run)
- [Contributors](#contributors)

---

## About the Project

Welcome to the TrashTalker application! This is a web application built on the MERN stack (MongoDB, Express, React, and Node.js) 

The goal of this application is to provide users with the motivation and knowledge to dispose of waste properly.   
Trash is frequently disposed of in improper ways, leading to increased pollution and damage to the environment.   
TrashTalker provides a unique, social, and rewarding way to learn about proper disposal of trash as well as track progress towards a users sustainability goals.   
The platform leverages React for a simple and intuitive user interface, as well as machine learning to help guide users and simplify the experience.    



---

## Features

- Trash disposal instructions and info pages 
- User accounts with score tracking and leaderboard
- Reward system for proper trash disposal 
- Image detection and classification system 
- Login and account creation with Google
- Modern and intuitive user interface
- Search bar with image detection features




---

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Other Tools**: (YoloV8 ML Model, Flask)

---

## Installation

```bash
# Clone the repo
git clone https://github.com/katherineeyee/TrashTalker.git

# Add Machine Learning Model Source Code to Root Project Directory
# This code did not fit in GitHub, so it must be added manually
# Place the files in a folder called 'backend'
https://drive.google.com/drive/folders/1Iq6YxJI_B5GMNrFHaRDz5VlIl5UfszLL?usp=sharing

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

# Download "backend" folder from google drive for YOLOv8 machine learning model
# This file is for setting up an object detection model that we use in the project
https://drive.google.com/drive/u/1/folders/1Iq6YxJI_B5GMNrFHaRDz5VlIl5UfszLL

# Install python dependencies and configure python env for python files in backend folder
```

---

## Project Structure

TrashTalker/  
├── .idea/  
├── backend/  
│ ├── uploads/  
│ └── venv/  
├── client/  
│ ├── node_modules/  
│ ├── public/  
│ └── src/  
│ ├── api/  
│ ├── components/  
│ ├── hooks/  
│ ├── icons/  
│ ├── pages/  
│ └── services/  
├── server/  
│ ├── models/  
│ ├── node_modules/  
│ └── routes/  


---

## Block Diagram
![Screenshot 2025-05-14 at 2 56 18 AM](https://github.com/user-attachments/assets/9bcbe296-c356-4064-ad8d-6f90e2f12fc2)

The block diagram illustrates the high-level architecture and data flow of the TrashTalker system, which is composed of three major components: the Client, the Application Server, and the Inference Backend, along with an external Authentication Service (Firebase). This architecture follows a modular and loosely-coupled design, separating concerns between user interface, application logic, and machine learning computation.

### Client (React Frontend):
This block represents the user-facing portion of the system, developed using React. It provides the graphical user interface (GUI) through which users interact with the system. The client allows users to perform several actions:

Register or log in using Firebase Authentication.

Upload images to be analyzed by the object detection model.

View the inference results (such as bounding boxes and labels for detected trash items).

Send and receive data via HTTP requests to and from the application server.
Upon successful login, Firebase returns a secure token (e.g., a JWT), which is used in subsequent requests to authenticate the user session.

### Application Server (Node.js + Express):
This block acts as a middleware layer between the frontend and the machine learning backend. It is built using Node.js and Express and is responsible for the following:

Handling incoming API requests from the React client, such as image uploads or result queries.

Validating user identity by verifying Firebase authentication tokens.

Forwarding image data received from the client to the backend Flask server for inference.

Receiving and processing detection results from the backend.

Returning the processed results to the client in a structured format (typically JSON).
This layer ensures the separation of concerns between the frontend and the computational backend while maintaining secure communication and access control.

### Inference Backend (Flask + YOLOv8):
This block represents the machine learning inference engine implemented in Python using the Flask framework. It is responsible for running the YOLOv8 object detection model on uploaded images. Key responsibilities include:

Accepting image data from the Node.js server through a dedicated endpoint (e.g., /predict).

Loading the YOLOv8 model and preprocessing the image.

Running inference to detect and classify trash objects within the image.

Returning the inference results (e.g., object class labels, bounding box coordinates, and confidence scores) to the server in JSON format.
This component is decoupled from the client and serves purely as a specialized computation service.

### Authentication Service (Firebase):
Firebase is an external authentication provider used to manage user registration and login. The client communicates directly with Firebase to authenticate users. Upon successful login, Firebase issues an ID token that the client attaches to its API requests. The application server can use Firebase Admin SDK or REST APIs to validate these tokens, ensuring that only authorized users can interact with the system.

🔄 Data Flow Overview:
Step 1: A user accesses the React application and logs in via Firebase.

Step 2: The user uploads an image, which is sent from the client to the application server along with the authentication token.

Step 3: The application server validates the request and forwards the image to the backend Flask server.

Step 4: The backend runs YOLOv8 inference on the image and generates prediction results.

Step 5: The server receives the results and forwards them back to the client.

Step 6: The client displays the output, allowing the user to view detected items in the uploaded image.

✅ Summary:
This block diagram emphasizes the clear separation between UI, logic, and AI components. Each block is responsible for a distinct function, and the system communicates through RESTful HTTP APIs and standardized data formats (e.g., JSON). The inclusion of Firebase ensures secure user access, while the use of modular blocks enables scalability, maintainability, and easier debugging of each component.

## Layer Diagram
![Screenshot 2025-05-14 at 3 07 39 AM](https://github.com/user-attachments/assets/b5984281-4806-4d13-a28b-89eefc759ab6)

### 📄Layer Diagram Description – TrashTalker System
The Layer Diagram illustrates the vertical organization of the TrashTalker system by dividing it into logical layers, each with distinct responsibilities and dependencies. The system follows a multi-tier architecture composed of the Presentation Layer, Application Logic Layer, Machine Learning (ML) Inference Layer, and External Services Layer. Each layer depends on the one below it but remains independent of the layers above, ensuring modularity, maintainability, and security.

### 🧱 1. Presentation Layer
Components: React.js Client, Firebase JavaScript SDK

Responsibilities:

Acts as the user interface for interaction with the system.

Allows users to log in or register using Firebase Authentication.

Provides interfaces for image upload and viewing prediction results.

Sends HTTP requests to the Application Logic Layer and receives JSON responses.

Dependencies: Communicates with Firebase for authentication and with the server API for data exchange.

### ⚙️ 2. Application Logic Layer
Components: Node.js with Express.js API

Responsibilities:

Acts as the central controller for request routing and business logic.

Receives image upload and analysis requests from the client.

Validates Firebase-issued ID tokens to authenticate users.

Forwards image data to the ML Inference Layer for processing.

Receives inference results and returns them to the client.

Dependencies: Relies on the Presentation Layer for user input and on the ML Inference Layer for analysis.

### 🧠 3. ML Inference Layer
Components: Python Flask Server with YOLOv8 Model

Responsibilities:

Provides an API endpoint (e.g., /predict) to receive image data.

Runs the YOLOv8 object detection model on the uploaded image.

Preprocesses input, executes the model, and post-processes the results.

Returns structured JSON results (detected classes, bounding boxes, confidence scores) to the application server.

Dependencies: Operates independently of the frontend; only interacts with the Application Logic Layer.

### 🔐 4. External Services Layer
Components: Firebase Authentication

Responsibilities:

Manages user authentication and session control.

Issues ID tokens after successful login or registration.

Validates tokens (used by the client or the server).

Does not handle application data directly but supports identity verification for secure access.

Dependencies: Communicated with by both the Presentation and Application Logic Layers.

### 🔁 Interaction Flow Summary
The user logs in via the React client, which interacts with Firebase Authentication.

Upon successful login, Firebase returns an ID token to the client.

The client uploads an image and sends the token with the request to the Node.js API server.

The server validates the token, then forwards the image to the Flask server.

The YOLOv8 model performs inference and returns the result to the server.

The server responds to the client with the prediction output.

The client displays the results to the user.

### ✅ Advantages of the Layered Architecture
Modularity: Each layer has a clear responsibility, making the system easier to develop, test, and maintain.

Security: Authentication is handled through a secure third-party (Firebase), and validation is enforced at the server layer.

Scalability: Each component can be scaled independently—e.g., deploying multiple inference servers for performance.

Separation of Concerns: UI, logic, and ML processing are clearly isolated, reducing coupling and improving maintainability.

## Class Diagram

## Sequence Diagram


## How To Run

Use 'npm run dev' to start the application from the main project directory


---

## Contributors

CS160 Project Team 4 Members: Apple Ko, Jaewon Kim, Katherine Yee, Riley Short, Vu Ai Van Trinh

