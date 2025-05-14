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

## How To Run

Use 'npm run dev' to start the application from the main project directory


---

## Contributors

CS160 Project Team 4 Members: Apple Ko, Jaewon Kim, Katherine Yee, Riley Short, Vu Ai Van Trinh

