# swdv691-StrengthStack-Backend
# StrengthStack Backend

This repository contains the backend code for the StrengthStack application.

## Description

The StrengthStack backend is built using Node.js and PostgreSQL. It provides the API endpoints and server-side logic for user authentication, workout management, progress tracking, and personalized recommendations.

## Technologies Used

* Node.js
* Express.js (or similar framework)
* PostgreSQL
* bcrypt (or similar for password hashing)
* JWT (or sessions) for authentication

## Database Schema

The database schema is defined in `src/models/` and is based on the following tables:

* **Users:** Stores user information (username, password, training level, goals). 
* **Workouts:** Stores workout data (user, date, exercises, sets, reps, weight, RIR, RPE). 
* **Exercises:** Stores exercise information (name, muscle group).
* **Progress:** Stores user progress data (date, reps, weight, estimated 1RM).

## Service Layer

The backend utilizes a service layer to encapsulate business logic:

* **UserService:** Handles user authentication and management.
* **WorkoutService:** Handles workout plan generation and workout logging.
* **ProgressService:** Handles progress tracking and analysis.
* **RecommendationService:** Handles personalized workout recommendations.

## Data Flow

The data flow follows this pattern: API Layer (Controllers/Routers) -> Service Layer -> Data Access Layer (Database) -> Service Layer -> API Layer. 

## Setup

Instructions on how to set up the backend (e.g., install dependencies, configure the database).

## API Endpoints

Documentation of the API endpoints (e.g., using Swagger or similar).

## Contributing

Guidelines for contributing to the project.

## License

(Specify the license)
