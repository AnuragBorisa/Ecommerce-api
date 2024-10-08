# E-Commerce API - Backend System

## Project Overview
This project involves developing an E-commerce backend system. The system includes various features such as user authentication, order management, cart functionality, and analytical reporting based on user orders. The backend is built using **Node.js**, **Express**, **PostgreSQL**, and **Sequelize ORM**.

## Table of Contents
- [Project Features](#project-features)
- [Technologies Used](#technologies-used)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Cart Management](#cart-management)
  - [Order Management](#order-management)
  - [Reporting and Analytics](#reporting-and-analytics)
- [Query Performance](#query-performance)
- [Installation Guide](#installation-guide)
- [Testing](#testing)
- [Conclusion](#conclusion)

## Project Features

### Task 1: Core Functionalities (APIs)
#### User Authentication:
- Signup and Login functionalities with password hashing and JWT authentication.

#### Cart Management:
- Add products to the cart and manage user carts.

#### Order Management:
- Place orders and view order details with products, quantities, and total amounts.

#### Checkout:
- Converts cart items to an order and clears the cart.

#### Reporting and Analytics:
- Analytical queries for user and product sales data, including weekly order analysis and product order counts.

## Technologies Used
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **PostgreSQL**: Relational database management system.
- **Sequelize ORM**: Object-relational mapping for database interaction.
- **JWT**: JSON Web Tokens for user authentication.
- **bcrypt.js**: For password hashing.

## Database Schema
The database schema is designed to handle e-commerce functionalities efficiently:

- **Users Table**  
  ![Users Table](./screenshots/usersTablecrop.png)  
  Stores user information (e.g., name, email, password).

- **Products Table**  
  ![Products Table](./screenshots/ProductsTablecrop.png)  
  Stores product information (e.g., name, price, stock).

- **Carts and CartItems**  
  ![Carts Table](./screenshots/CartsTablecrop.png)  
  ![CartItem Table](./screenshots/CartItemTablecrop.png)  
  Manages user carts, products in carts, and their quantities.

- **Orders and OrderItems**  
  ![Order Table](./screenshots/OrdersTablecrop.png)  
  ![OrderItem Table](./screenshots/OrderItemTablecrop.png)  
  Tracks user orders, products in orders, and their quantities and prices.

## API Endpoints

### Authentication APIs
#### Signup
- **Method**: POST  
- **URL**: `/api/auth/signup`  
- **Body**: 
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password"
    }
    ```
- **Response**: Status 201, `{ message: "User registered successfully" }`  
  ![Signup API](./screenshots/ecommerce-siginUp.png)

#### Login
- **Method**: POST  
- **URL**: `/api/auth/login`  
- **Body**: 
    ```json
    {
      "email": "john@example.com",
      "password": "password"
    }
    ```
- **Response**: Status 200, `{ token: "JWT_TOKEN" }`  
  ![Login API](./screenshots/ecommerce-login.png)

### Cart Management APIs
#### Add to Cart
- **Method**: POST  
- **URL**: `/api/cart/add`  
- **Headers**: Authorization: Bearer `<token>`  
- **Body**: 
    ```json
    {
      "productId": 1,
      "quantity": 2
    }
    ```
- **Response**: Status 201, `{ message: "Product added to cart" }`  
  ![Add To Cart API](./screenshots/addtocartApi.png)

### Order Management APIs
#### Checkout and Place Order in Single Transaction
- **Method**: POST  
- **URL**: `/api/orders`  
- **Headers**: Authorization: Bearer `<token>`  
- **Body**: 
    ```json
    {
      "cartId": 1
    }
    ```
- **Response**: Status 201, `{ message: "Order placed successfully" }`  
  ![Place Order And Checkout API](./screenshots/checkout-Api.png)

#### Get Orders
- **Method**: GET  
- **URL**: `/api/orders`  
- **Headers**: Authorization: Bearer `<token>`  
- **Response**: Status 200, returns user order history.  
  ![Get Orders API](./screenshots/getOrders.png)

### Analytics & Reporting APIs
#### User-Product Analysis
- **Method**: GET  
- **URL**: `/api/analysis/user-product`  
- **Response**: Returns each user's ordered products, their total quantity, and total value.  
  ![Query1 result](./screenshots/Query1.png)

#### Weekly Orders Analysis (Q1 2024)
- **Method**: GET  
- **URL**: `/api/analysis/weekly-orders`  
- **Response**: Returns weekly order statistics including total orders, products sold, and total sales.  
  ![Query2 result](./screenshots/Query2.png)

#### Top Products (Products with >= 5 Orders)
- **Method**: GET  
- **URL**: `/api/analysis/top-products`  
- **Response**: Returns a list of products that were ordered 5 or more times.  
  ![Query3 result](./screenshots/Query.png)

## Query Performance
The queries used in this project were optimized to handle large data sets efficiently:
- **Indexes**: Used on frequently searched columns like userId, orderId, and productId to speed up joins and lookups.
- **Aggregation**: Functions like SUM, COUNT, and GROUP BY ensure accurate and fast analytical results.
- **JOIN Performance**: Proper use of joins across Orders, OrderItems, Products, and Users tables ensures query efficiency without unnecessary data duplication.

## Installation Guide

### Step 1: Clone the Repository
```bash
git clone https://github.com/AnuragBorisa/Ecommerce-api
cd ecommerce-backend
```
### Step 2: Install Dependencies
```bash
npm install
```
### Step 3: Set Up PostgreSQL Database
```bash 
Create a PostgreSQL database.
Update the .env file with your database credentials:
DB_NAME=ecommerce_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=your_jwt_secret
PORT=8080
```
### Step 4: Run Migrations
```bash 
npx sequelize-cli db:migrate
```
### Step 5: npm start
```bash 
The server will start at http://localhost:8080.
```
### Testing 
To test the APIs, you can use Postman or cURL:

Signup & Login: Register a user and log in to get a JWT token.
Add Products to Cart: Use the Add to Cart API with the JWT token.
Place Orders: Place orders for the products in the cart.
Analytics & Reporting: Test the analytics endpoints to fetch reports.

### Conclusion
This E-commerce backend system is designed with scalability and performance in mind. The API layer offers essential functionalities for managing users, products, carts, and orders while also providing detailed reporting capabilities for user and product analysis. The database schema, queries, and optimizations ensure that the system can handle large data volumes efficiently.

Thank you for reviewing the project! If you have any questions or feedback, please feel free to reach out. 