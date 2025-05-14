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

## Class Diagram

## Sequence Diagram


## How To Run

Use 'npm run dev' to start the application from the main project directory


---

## Contributors

CS160 Project Team 4 Members: Apple Ko, Jaewon Kim, Katherine Yee, Riley Short, Vu Ai Van Trinh

