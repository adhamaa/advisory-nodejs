# Node.js API for User Authentication and Listing Management

This project is a Node.js-based RESTful API for user authentication and listing management. It includes **minimal** role-based access control, database migrations, and seeding. The application uses Sequelize as the ORM, MySQL as the database, and Express.js as the web framework.

---

## **Table of Contents**

1. [Prerequisites](#prerequisites)
2. [Setup Instructions](#setup-instructions)
   - [Environment Configuration](#environment-configuration)
   - [Database Setup](#database-setup)
3. [Running the Application](#running-the-application)
4. [API Endpoints](#api-endpoints)
   - [User Login](#user-login)
   - [Get Listings](#get-listings)

---

## **Prerequisites**

Before starting, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MySQL](https://www.mysql.com/)
- [Sequelize CLI](https://sequelize.org/)

---

## **Setup Instructions**

### **Step 1: Clone the Repository**

```bash
git clone https://github.com/adhamaa/advisory-nodejs.git
cd advisory-nodejs
```

### **Step 2: Install Dependencies**

Install the required Node.js packages:

```bash
npm install
```

### **Step 3: Environment Configuration**

Copy the .env.example file and create a .env file:

```bash
cp .env.example .env
```

Update the .env file with your MySQL database credentials and other settings:

```bash
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=database_development
JWT_SECRET=your_secret_key
```

### **Step 4: Database Setup** (_assume that you already have a mysql database_)

#### **1. Create the Database**

Run the following command to create the database:

```bash
npx sequelize-cli db:create
```

Alternatively, you can manually create the database:

```bash
CREATE DATABASE database_development;
```

#### **2. Run Migrations**

Apply migrations to set up the database schema:

```bash
npx sequelize-cli db:migrate
```

#### **3. Seed the Database**

Run seeders to populate the database with initial data:

```bash
npx sequelize-cli db:seed:all
```

## Running the Application

```bash
npm start
```

The server will run at http://localhost:3000. Update the .env file to modify the port if needed.

# API Endpoints

### User Login

#### URL: `/api/login`

#### Method: `POST`

#### Request Body:

```json
{
  "email": "test@gmail.com",
  "password": "test1234"
}
```

#### Response:

```json
{
  "status": 200,
  "message": "Logged in",
  "result": {
    "user_id": 5,
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOi...",
    "token_type": "Bearer",
    "role_type": "u",
    "expires_at": "2022-03-16 12:31:39"
  }
}
```

### Get Listings

#### URL: `/listing/get`

#### Method: `GET`

#### Headers:

```
Authorization: Bearer <access_token>
```

#### Query Parameters:

```
user_id=<user_id>
```

#### Response:

```json
{
  "status": 200,
  "message": "Success",
  "result": {
    "current_page": 1,
    "data": [
      {
        "id": 4,
        "name": "Starbucks Mid Valley",
        "distance": "0.6",
        "created_at": "2021-03-10 12:24:38",
        "updated_at": "2021-03-10 12:24:38"
      },
      {
        "id": 9,
        "name": "Burger King",
        "distance": "0.8",
        "created_at": "2021-03-10 12:24:38",
        "updated_at": "2021-03-10 12:24:38"
      }
    ]
  }
}
```
