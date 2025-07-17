# Course Project: Auction System

## Overview  
This project demonstrates implemention a web-based auction information system that automates the creation and management of auctions, lots, bids, and user roles. The system follows a three-tier architecture and uses the MVC pattern to ensure clear separation of concerns.

## Features  
- Role-based access: Participant, Recruiter, Administrator  
- User registration and authentication  
- Auction creation and editing  
- Lot management with category assignment  
- Bidding with automatic validation and balance checks  
- Winner selection
- Role-specific user interface views  
- Triggers and functions to enforce business rules

## Technologies Used  
- Java (Spring Boot)  
- JavaScript (React)  
- SQL (PostgreSQL)

## Database Schema
<details>
  <summary>Expand</summary>
  
  ### `user`
  
  | Column      | Type              | Constraints               |
  |-------------|-------------------|---------------------------|
  | id          | SERIAL            | PRIMARY KEY               |
  | username    | VARCHAR(30)       | NOT NULL, UNIQUE          |
  | first_name  | VARCHAR(50)       | NOT NULL                  |
  | last_name   | VARCHAR(50)       | NOT NULL                  |
  | balance     | DOUBLE PRECISION  | DEFAULT 0                 |
  
  ---
  
  ### `category`
  
  | Column      | Type              | Constraints               |
  |-------------|-------------------|---------------------------|
  | id          | SERIAL            | PRIMARY KEY               |
  | title       | VARCHAR(255)      | NOT NULL                  |
  | description | VARCHAR(100)      |                           |
  
  ---
  
  ### `auction`
  
  | Column      | Type                      | Constraints                                        |
  |-------------|---------------------------|----------------------------------------------------|
  | id          | SERIAL                    | PRIMARY KEY                                        |
  | admin_id    | INTEGER                   | NOT NULL, FOREIGN KEY → `user(id)`                |
  | title       | VARCHAR(100)              | NOT NULL                                          |
  | description | VARCHAR(255)              |                                                   |
  | start_date  | TIMESTAMP WITH TIME ZONE  | NOT NULL, DEFAULT `CURRENT_TIMESTAMP`             |
  | end_date    | TIMESTAMP WITH TIME ZONE  |                                                   |
  
  ---
  
  ### `lot`
  
  | Column       | Type              | Constraints                                         |
  |--------------|-------------------|-----------------------------------------------------|
  | id           | SERIAL            | PRIMARY KEY                                         |
  | auction_id   | INTEGER           | NOT NULL, FOREIGN KEY → `auction(id)`              |
  | category_id  | INTEGER           | NOT NULL, FOREIGN KEY → `category(id)`             |
  | amount       | DOUBLE PRECISION  | DEFAULT 0                                           |
  | title        | VARCHAR(100)      | NOT NULL                                           |
  | description  | VARCHAR(255)      |                                                    |
  
  ---
  
  ### ✉️ `proposal`
  
  | Column      | Type        | Constraints                                |
  |-------------|-------------|--------------------------------------------|
  | id          | SERIAL      | PRIMARY KEY                                |
  | lot_id      | INTEGER     | NOT NULL, FOREIGN KEY → `lot(id)`          |
  | user_id     | INTEGER     | NOT NULL, FOREIGN KEY → `user(id)`         |
  | description | VARCHAR(255)| NOT NULL                                   |
  
  ---
  
  ### `bid`
  
  | Column    | Type              | Constraints                              |
  |-----------|-------------------|------------------------------------------|
  | id        | SERIAL            | PRIMARY KEY                              |
  | lot_id    | INTEGER           | NOT NULL, FOREIGN KEY → `lot(id)`        |
  | user_id   | INTEGER           | NOT NULL, FOREIGN KEY → `user(id)`       |
  | amount    | DOUBLE PRECISION  | NOT NULL                                 |
  | bid_date  | TIMESTAMP         | DEFAULT `CURRENT_TIMESTAMP`              |
  
  ---
  
  ### `payment`
  
  | Column    | Type              | Constraints                              |
  |-----------|-------------------|------------------------------------------|
  | id        | SERIAL            | PRIMARY KEY                              |
  | lot_id    | INTEGER           | NOT NULL, FOREIGN KEY → `lot(id)`        |
  | user_id   | INTEGER           | NOT NULL, FOREIGN KEY → `user(id)`       |
  | amount    | DOUBLE PRECISION  | NOT NULL                                 |
</details>

## Build and Run Instructions  
### Option 1: Using Docker (Recommended)

1. Make sure Docker and Docker Compose are installed.
2. Create a `.env` file in the root directory based on the provided `.env.sample`.
3. Run the application using Docker Compose:
```bash
docker-compose up --build
```
The system will be available at:
- Database: http://localhost:5432
- Backend: http://localhost:8080
- Frontend: http://localhost:3000

### Option 2: Manual Setup
#### 1. Database

Install PostgreSQL and create a new database (e.g., auction)
Execute all SQL files in the init-scripts folder to set up schema, triggers, and roles.

#### 2. Backend

Go to the backend directory.
Create a .env file based on .env.sample.
Run the Spring Boot app:
```bash
./mvnw spring-boot:run
```
#### 3. Frontend

Navigate to the frontend directory.
Create a .env file based on .env.sample.
Install dependencies and start the React app:
```
npm install
npm start
```
4. Access
- Database: http://localhost:5432
- Backend: http://localhost:8080
- Frontend: http://localhost:3000
