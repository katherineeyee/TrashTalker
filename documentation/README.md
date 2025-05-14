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
![UML_Class](https://github.com/user-attachments/assets/208ab9a4-1469-471f-a9e0-11376cd84d52)
### 🧩 Section 1:Project Overview and Purpose of UML Class Diagram
TrashTalker is a full-stack web application that encourages users to properly classify waste through an image-based quiz game. The architecture includes a React frontend, an Express + MongoDB backend, Firebase Authentication for user login, and an ML server for object classification using YOLOv8.

The UML Class Diagram aims to:

Visualize the overall structure of the project

Define the relationship between frontend and backend components

Illustrate API dependency flows and data modeling logic

### 🎨 Section 2: Frontend Component Architecture (React)
HomePage Component
This is the landing page that introduces the app’s concept and invites users to start the game or sign up. It includes:

Navbar

LandingSection

Features

HowItWorks

Gamification

RewardSection

QuickSignUp

When a user clicks "Start Game", it navigates to /game using useNavigate.

Navbar Component
This navigation bar is persistent across all main pages. It:

Displays links to Home, Leaderboard, Rewards, and Account

Shows "Login"/"Logout" buttons depending on Firebase user state

Responds to scroll events or route changes using navigateToSection()

LandingSection / Features / HowItWorks
These are static sections explaining the core features. The FeatureCard sub-component displays one feature at a time using props like iconName, title, and description.

Gamification Component
Displays a preview of the leaderboard. If a user isn't logged in, it:

Triggers an authentication modal on leaderboard access

Navigates to /leaderboard post-login

QuickSignUp Component
This encourages users to sign up quickly using Firebase OAuth. On successful login:

It sends a POST request to /api/users to register the user

Calls /api/users/:email/updateRewards to give daily login rewards and manage streaks

RewardSection Component
Promotes real-life rewards (e.g., gift cards). If a logged-in user clicks the "See Rewards" button:

Navigates to /rewards
If not logged in:

Shows an authentication modal and redirects after login

GamePage & ImageUploader Component
The core of the quiz game:

Users upload an image

The image is sent to http://localhost:5000/predict (YOLOv8 model server)

The response includes: object name, sub-category, and main category

The game begins via the QuizSection component

QuizSection Component
Displays one quiz question using the ML result. When a user selects an answer:

Sends a POST request to /api/quiz with quiz data

Sends a PUT request to /api/users/:email/points?numPoints=50 if correct

Shows feedback and transitions to the next image upon "Next Question"

RewardsPage Component
Logged-in users can:

View their points (PointsSummary)

Redeem rewards if they have enough points (RewardCard)

Earn points through daily login or correct answers

The point deduction is handled by PUT /api/users/:email/points?numPoints=-X.

LeaderboardPage Component
Displays top users sorted by score using:

GET /api/users/topScore?numUsers=100
The data is shown using a stylized list with icons and ranking.

AccountPage Component
Shows:

User info (UserInfoCard)

Stats (StatCard)

Badges (Badge component)

Editable fields (like location)

PUT requests update user data (e.g., location via /api/users/:email/location)

Waste Category Pages
Static information pages (e.g., Plastic.jsx, Glass.jsx) each explain how to dispose of a specific type of waste. They use the WasteInfoCard component for formatting.

### 🧩 Section 3: Backend Architecture (Node.js + MongoDB)
The backend is built with Node.js, uses the Express.js framework, and connects to MongoDB through Mongoose for ODM. It is responsible for handling user authentication, quiz record management, and reward logic.

🔧 server.js (Main Express App Entry Point)
Initializes Express app

Applies middlewares: express.json(), cors(), and morgan('dev')

Connects to MongoDB (hardcoded connection string)

Registers route files:

/api/users → routes/users.js

/api/quiz → routes/quiz.js

Starts the server on port 5001

📦 Mongoose Models (MongoDB Collections)
🧍‍♂️ User Model (models/Users.js)
Defines user accounts. Fields include:

firstName, lastName, email (unique)

points, location, streak

dateCreated, dateOfLastLogin

Used for all authentication and gamification-related features. Mapped to the MongoDB users collection.

🧠 QuizRecord Model (models/QuizRecord.js)
Stores the result of each quiz attempt. Fields include:

userId: reference to the User model (1-to-many relationship)

imageId, object, subCategory, mainCategory, userAnswer, isCorrect, rewardGiven, createdAt

Each document represents one quiz record.

🧪 Test Model (models/Test.js)
Contains a test schema (data, message) used for testing MongoDB connectivity. Not used in the main application logic.

### 🗂️ Section 4: Backend Routers (Controllers)
👤 User Router (routes/users.js)
Handles all user-related endpoints:

GET /api/users – Get all users

GET /api/users/:email/UserByEmail – Get user by email

GET /api/users/topScore?numUsers=N – Get top N users sorted by points

POST /api/users – Create a new user (called after Firebase login)

PUT /api/users/:email/points?numPoints=X – Update user's points

PUT /api/users/:email/streak – Increment login streak

PUT /api/users/:email/resetStreak – Reset streak to 1

PUT /api/users/:email/date – Update last login date

PUT /api/users/:email/location – Update user's location

PUT /api/users/:email/updateRewards – Daily login reward handler

GET /api/users/byEmail?email=... – Get user by email via query string (alternative endpoint)

This router is the most actively used one. It connects tightly with both the RewardsPage, AccountPage, and QuizSection components on the frontend.

📝 Quiz Router (routes/quiz.js)
Only one endpoint:

POST /api/quiz – Create a new quiz record

Used by the QuizSection component to save each quiz attempt.

### 🔁 Section 5: Frontend & Backend API Integration Flow
Here’s how different features interact between the frontend and backend:

🔐 User Login and Account Creation Flow
When the user logs in via Firebase OAuth:

POST /api/users is called to create the user in MongoDB

PUT /api/users/:email/updateRewards is called to:

Update the streak

Add daily login points (+5)

🎮 Game Flow
On /game, the user uploads an image

POST http://localhost:5000/predict sends the image to the YOLOv8 server

The model returns object, subCategory, and mainCategory

QuizSection displays the question:

On answer selection:

POST /api/quiz to save the result

PUT /api/users/:email/points?numPoints=50 if the answer was correct

🎁 Reward Flow
In /rewards page:

GET /api/users fetches user data

When redeeming:

PUT /api/users/:email/points?numPoints=-X deducts the appropriate amount

Then, user data is re-fetched to show updated points

🏆 Leaderboard Flow
GET /api/users/topScore?numUsers=N returns the top N users by points

👤 Account Management Flow
GET /api/users retrieves user data for display

PUT /api/users/:email/location updates user location

Optional: could call PUT /updateRewards to allow user-initiated login reward

### 💡 Section 6: Component-API Dependency Mapping
Below are some key dependency flows shown as dotted lines in the UML:

Frontend Component	Calls Backend Endpoint(s)	Purpose
QuizSection	POST /api/quiz, PUT /api/users/:email/points	Save result, update score
RewardsPage	GET /api/users, PUT /api/users/:email/points	Load user data, deduct points
Gamification	GET /api/users/topScore	Display top 5 leaderboard
AccountPage	GET /api/users, PUT /api/users/:email/location	Show & update profile info
QuickSignUp	POST /api/users, PUT /api/users/:email/updateRewards	Create account, trigger login bonus
ImageUploader	POST /predict (to ML server)	Get image classification

These dependency arrows show which components rely on which API routes, and are visualized using dotted arrows in the UML diagram.

### 🏗️ Section 7: Final Architectural Summary — Data Flow, Security, and Separation of Concerns
🔄 Full Client-Server Data Flow Summary
The architecture follows a clean client-server model where:

Frontend (React) handles UI rendering and user interaction

Backend (Express + MongoDB) manages persistent data and API logic

Firebase Authentication handles secure user login and session management

ML Inference Server (YOLOv8) provides object detection/classification from uploaded images

This system separates responsibilities across services. The frontend doesn’t hold or store persistent user state — instead, it fetches it as needed through RESTful API calls.

🎮 Game Lifecycle (Full Stack Perspective)
When a user plays the quiz:

They upload an image → sent via POST /predict to the YOLOv8 model server

Model returns object metadata

React component QuizSection displays the classification quiz

User selects an answer:

The frontend posts the quiz result to /api/quiz

If correct, sends PUT /api/users/:email/points?numPoints=50

Response is acknowledged, and UI updates with feedback

This shows a multi-service flow involving:

ML server for predictions

Express backend for tracking scores

MongoDB for storage

Firebase for authentication

🏆 Leaderboard & Rewards Flow
The leaderboard is fetched via:

GET /api/users/topScore?numUsers=N

The rewards page:

Uses GET /api/users to get current user data

Uses PUT /api/users/:email/points to deduct points

Redemption is conditional:

Only allowed if user.points ≥ reward.points

🔒 Notes on Security & Improvements
Currently:

Firebase handles authentication securely

However, the backend does not verify Firebase tokens

In a production-grade app, this should be improved by:

Passing the Firebase token in the Authorization header

Having Express middleware verify the token (e.g. via firebase-admin)

Also, most API endpoints are public. In a real deployment:

All user-related API routes should be protected and validated


## Sequence Diagram
![Sequence Diagram](https://github.com/user-attachments/assets/c738c2f2-f766-444f-85d4-4480aac49191)
Figure: Sequence diagram illustrating the full user interaction flow in the TrashTalker application. The User interacts with the Web App (React) front-end, which in turn communicates with the YOLOv8 Model server and the Node.js Server (backend). The diagram traces the steps from the user starting the game, uploading an image, the YOLO model inference, displaying the quiz question, the user’s answer submission, to updating points and preparing for the next round.

### Explanation of the Interaction Flow
Below is a step-by-step explanation of the sequence, covering the UI components involved, the backend API calls, and the YOLOv8 model inference. This reflects a software engineering perspective on how the front-end, backend, and machine learning model coordinate the TrashTalker game flow:

### 1. Game Start
Navigation to GamePage: The user initiates the game by clicking the “Start Game” button on the home page (handled by the HomePage component). This triggers a React router navigation to the GamePage component. The GamePage is rendered, which includes the ImageUploader component (the upload form for the game). At this point, the web app displays the game interface to the user (the file upload field and a start button).

### 2. Image Selection and Submission
On the GamePage, the user selects a photo of a trash item (e.g. a plastic bottle) using the file input and then clicks the “Start The Game!” submit button in the ImageUploader component. This user action invokes the handleSubmit event handler in ImageUploader.jsx, which prepares to send the image to the server. Internally, the component creates a FormData object and appends the image file to it, then sets a loading state (showing a message like “Analyzing...” while the image is being processed).

### 3. Calling the YOLOv8 Model (Image Prediction)
The front-end (ImageUploader component) sends an HTTP POST request to the YOLOv8 model server endpoint at http://localhost:5000/predict with the image file in the request body. This is an asynchronous fetch call in the React app. The YOLOv8 model server (a separate service, presumably a Python server running a YOLOv8 model) receives the image and performs inference. The YOLOv8 model, pre-trained for object detection/classification, identifies the object in the image and determines its category for waste sorting. For example, the model might recognize the object as a “plastic bottle” which falls under sub-category “Plastic Bottle” and main category “Recycle.” (The exact categories and labels are determined by the model’s training and the app’s logic.)

### 4. Receiving Prediction Results
After processing, the YOLOv8 server responds with a JSON payload containing the prediction results – typically including the detected object name, its subCategory (a more specific name or description of the item), and the mainCategory which represents the correct disposal category (e.g. recycle, compost, or landfill). The React front-end awaits this response. Once received, the ImageUploader component’s promise resolves with the data, and the component updates its state by storing the result (via setResult(data)) and turning off the loading indicator. At this point, the image has been classified; for example, the result might be { object: "bottle", subCategory: "Plastic Bottle", mainCategory: "Recycle" }.

### 5. Displaying the Quiz Question
With the classification result available, the front-end now transitions to the quiz phase. The ImageUploader component conditionally renders a QuizSection component when a result is present. Upon receiving the model’s result, the ImageUploader switches from the upload form to the quiz UI (QuizSection). The QuizSection component displays a question to the user: “Where should we throw out [subCategory]?” where subCategory is the name of the identified item (for example, “Plastic Bottle”). It also shows three possible answers as buttons: “Recycle”, “Compost”, and “Landfill.” This is the core of the game – the user must guess the correct waste category for the item identified by the YOLO model.

### 6. User Selects an Answer
The user reviews the question and clicks one of the options (say the user chooses “Recycle” in this example). This triggers the handleSelect function inside QuizSection.jsx. The UI immediately records the choice – the selected option is highlighted and the component’s state isAnswered is set to true to indicate an answer was given. The QuizSection component logic will then display feedback to the user (which we detail in a later step). Importantly, along with updating the UI, the app also prepares to send the answer and related data to the backend for record-keeping and scoring.

### 7. Sending Quiz Result to Backend
Upon the user’s answer, the front-end makes an API call to the Node.js server to record the quiz attempt. Specifically, the QuizSection’s handleSelect uses fetch to send a POST request to http://localhost:5001/api/quiz with a JSON body containing the quiz data. This payload includes:
- userId: an identifier for the user (in the provided code this is a placeholder "000000000000000000000000", but in a real scenario it would be the logged-in user’s ID from the database or authentication system),
- imageId: a generated ID for the image or attempt (the code creates an ID like "image-<random>" to uniquely identify the quiz attempt),
- object: the object name detected by YOLO (e.g. "bottle"),
- subCategory: the specific subcategory or item name (e.g. "Plastic Bottle"),
- mainCategory: the correct category for disposal (e.g. "Recycle"),
- userAnswer: the option the user selected (e.g. "Recycle"),
- isCorrect: a boolean indicating if the user’s answer was correct (true if the userAnswer matches the mainCategory, else false),
- rewardGiven: a boolean indicating if a reward was given for this attempt. (In the code, this is set to true if the answer is correct, otherwise false, essentially the same condition as isCorrect).

This data is sent in JSON format to the /api/quiz endpoint on the backend. The fetch call is awaited so that any network or server errors can be caught and logged in the console.

### 8. Backend Logging the Quiz Record
The Node.js Server (Express app running at port 5001) receives the POST request at the /api/quiz route (handled by routes/Quiz.js on the server). The server-side code creates a new QuizRecord document in the MongoDB database using the data from the request body. The QuizRecord schema defines fields for userId, imageId, object, subCategory, mainCategory, userAnswer, isCorrect, rewardGiven, and a timestamp. Upon saving the record to the database, the server responds with a confirmation – typically an HTTP 201 status and the JSON of the saved record. (This step is done server-side; the front-end doesn’t explicitly use the returned data in the current implementation, but logging or future features could utilize it.)

### 9. Updating User Points (Gamification)
In parallel with recording the quiz result, if the user’s answer was correct, the app awards points to the user as part of the gamification system. Inside the handleSelect function, after the quiz POST, there is a check if (option === mainCategory) – i.e., if the selected answer is correct. If true, the front-end triggers another API call to the backend: a PUT request to http://localhost:5001/api/users/<email>/points?numPoints=50. This calls the server’s user route to increment that user’s points by 50. The <email> in the URL is the user’s email URL-encoded (the code obtains the current user’s email via Firebase auth state and interpolates it in the URL). On the backend, the users.js route for PUT /:email/points finds the user by email and adds the specified number of points (50 in this case) to their points field. The server then saves the updated user document. This design allows the application to keep track of user scores – each correct answer gives the user 50 points.

### 10. Server Response for Points Update
The Node.js server completes the points update and sends back a response (e.g., the updated user JSON or a success message). The front-end doesn’t explicitly wait for this response before updating the UI; the points update happens in the background. (If there were a user profile display or points tally visible in the UI, the front-end might next fetch the updated user info or rely on real-time updates. In the given code, the points update call is fire-and-forget aside from error logging.) The separation of concerns here (one request to log the quiz attempt, another to update user points) shows a modular backend API design.

### 11. Immediate Feedback to the User
As soon as the user clicks an answer, the QuizSection UI provides feedback without waiting on the server. Thanks to the state update (isAnswered and selected), the component conditionally renders a feedback section. In the code, once isAnswered is true, the UI shows a message: if the answer was correct, it displays a green success message (e.g., “🎉 Congraturation! You get 50 rewards!”) along with awarding emoji; if the answer was wrong, it shows a red message with the correct answer (e.g., “❌ The answer is Recycle.”). This feedback is defined in the QuizSection.jsx markup and is immediately visible to the user as the state changed when they selected an option. The UI also renders a “Next Questions →” button for the user to proceed. At this point, the user has their result: they know whether they were correct and have received points if applicable. The front-end’s non-blocking asynchronous design (using await fetch in an event handler) allows the UI to update instantly; the network calls to the server happen in the background (the user’s experience is not stalled waiting for the database update).

### 12. Next Question
Preparing for Another Round: After reviewing the feedback, the user can click the “Next Questions →” button (rendered by QuizSection when an answer is finished). When the user clicks this, the handleNext function in QuizSection is invoked, which in turn calls the onNext callback provided by the parent component (ImageUploader). The onNext callback in ImageUploader resets the game state on the front-end: it clears the result and image state, effectively unmounting the QuizSection and showing the upload form again (since result becomes null, the JSX switches back to showing the file input form). This reset prepares the app for a new round. At this stage, the sequence can begin again at step 2 if the user chooses to upload another item image to continue the game.

### 13. Parallel and Asynchronous Processing
Throughout this flow, it’s worth noting the parallel processing and asynchronous design. The YOLOv8 model operates as an independent service (on a separate port 5000), allowing the compute-heavy image inference to run in parallel with the Node.js web server (port 5001). The front-end communicates with both services asynchronously. For example, while the YOLO model is analyzing the image, the front-end shows a loading state – the UI thread is not blocked, thanks to the async fetch call. Similarly, when sending data to the Node.js server, the app does so in the background. This decoupled architecture (often called a microservice style) means the machine learning model and the main application logic scale separately and can run concurrently. A university-level student interested in AI and parallel processing can appreciate that the YOLOv8 model (which could be using GPU acceleration) is kept separate from the Node.js server; this separation allows the AI inference to be optimized independently and illustrates a form of parallelism where the front-end, the ML model, and the backend database operations all happen in an overlapping time frame. The use of asynchronous JavaScript (Promises/async-await) ensures that the user interface remains responsive – for instance, the moment the user selects an answer, the UI updates the state immediately while the network calls happen asynchronously.

### 14. Summary of Data Flow
In summary, the sequence involves three main actors besides the user: the front-end React app, the YOLOv8 model service, and the Node.js backend. The React front-end (pages and components) handles user interactions (navigation, form input, button clicks) and dynamic UI updates. It communicates with the YOLOv8 Inference Model to classify the uploaded image, and with the Node.js Server for recording results and updating user points. The Node.js server in turn interacts with a MongoDB database (storing user accounts and quiz records). Each stage – from image upload, model prediction, quiz display, answer submission, to database update – is part of a cohesive flow enabling the TrashTalker app to educate users on waste sorting in an interactive, gamified way. The sequence diagram above visually ties these stages together, showing how an action by the user propagates through the system and back to provide feedback, illustrating a full round-trip of data and control in the application.

## How To Run

Use 'npm run dev' to start the application from the main project directory


---

## Contributors

CS160 Project Team 4 Members: Apple Ko, Jaewon Kim, Katherine Yee, Riley Short, Vu Ai Van Trinh

