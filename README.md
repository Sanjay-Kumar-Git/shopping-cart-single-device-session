<div align='center'><h1> 🛒 Shopping Cart E-Commerce Web Application</h1>
</div>
<p align='left'>
A full-stack e-commerce web application that implements the complete shopping lifecycle including User Authentication, Single Device Session Management, Cart Management, Checkout, and Order History.
</p>
<p >
This project is built as part of an assessment and extended to production-style architecture with real-world UI and cart management features.
</p>

---

## 📌 Features
#### 🔐 Authentication

- User Registration

- User Login

- JWT Based Authentication

- Single Device Login Restriction

- Secure Logout with Token Invalidation

#### 🛍 Product Management

- Product Listing Dashboard

- Product Images

- Stock Availability Status

- Category Support

#### 🛒 Cart Management

- Add Items to Cart

- Increase Item Quantity

- Decrease Item Quantity

- Remove Items from Cart

- Auto Remove When Quantity = 0

- Live Cart Total Calculation

#### 📦 Order Management

- Checkout from Cart

- Order Creation

- Order History Page

- Order Item Details

- Order Total Calculation
---

### 🧠 Single Device Session Logic

The application enforces single device login using JWT token storage.

#### How it Works:

    1. On Login → JWT token generated and stored in DB

    2. If token already exists → Login blocked

    3. On Logout → Token removed from DB

    4. Allows login again on same or different device
---

### 🛠 Tech Stack
#### Frontend

- React (Vite)

- Tailwind CSS

- Axios

- React Router

- Lucide React Icons


#### Backend

- Node.js

- Express.js

- MongoDB

- Mongoose

- JWT Authentication

- Bcrypt Password Hashing

- CORS
---
## 📂 Project Structure
```
shopping-cart-app
│
├── backend
│   ├── models
│   │   ├── User.js
│   │   ├── Item.js
│   │   ├── Cart.js
│   │   └── Order.js
│   │
│   ├── routes
│   │   ├── userRoutes.js
│   │   ├── itemRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   │
│   ├── middleware
│   │   └── auth.js
│   │
│   ├── server.js
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── Orders.jsx
│   │   │
│   │   ├── api
│   │   │   └── axios.js
│   │   │
│   │   ├── utils
│   │   │   └── auth.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── .env
```
---
## ⚙️ Environment Variables
#### Backend (.env)
    PORT=5000
    MONGO_URI=mongodb+srv://sanjaythadaka614_db_user:lSXT0tNvwNB3aZNf@shopping-cart.t07o9wb.mongodb.net/?appName=Shopping-cart
    JWT_SECRET=shoppingcart


#### Frontend (.env)
VITE_API_BASE_URL=http://localhost:5000

---

## 🚀 Installation & Setup
#### 1️⃣ Clone Repository
    git clone https://github.com/Sanjay-Kumar-Git/shopping-cart-single-device-session.git
    cd shopping-cart-app

#### 2️⃣ Backend Setup
    cd backend
    npm install
    npm run dev

#### 3️⃣ Frontend Setup
    cd frontend
    npm install
    npm run dev
---
## 📡 API Endpoints

#### 👤 Users
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/users` | Register User |
| **POST** | `/users/login` | Login User |
| **POST** | `/users/logout` | Logout User |
| **GET** | `/users` | List Users |


### 🛒 Shopping Cart
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/carts` | Add an item to the cart |
| **GET** | `/carts` | View current user's cart |
| **PATCH** | `/carts/:itemId/inc` | Increase quantity by 1 |
| **PATCH** | `/carts/:itemId/dec` | Decrease quantity by 1 |
| **DELETE** | `/carts/:itemId` | Remove item from cart |

### 📦 Order Management
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/orders` | Place a new order (Convert cart to order) |
| **GET** | `/orders` | Retrieve order history for the user |

---
### 🧪 Testing APIs

#### You can use:

- Postman

- VS Code REST Client

- test.http file

---
## 🖼 Demo Flow
```
Register
 → Login
 → Dashboard (View Products)
 → Add To Cart
 → Cart (Manage Quantity)
 → Checkout
 → Orders History
 ```
 ---

## 🔒 Security Features

- Password Hashing using Bcrypt

- JWT Authentication

- Protected Routes

- Single Device Session Enforcement

---
## 🌟 Future Improvements

- Payment Gateway Integration

- Product Search & Filters

- Address Management

- Order Tracking

- Admin Dashboard

- Wishlist Feature

---

## 👨‍💻 Author

<i>Sanjay Kumar Thadaka</i>
```
B.Tech Computer Science Engineering
Full Stack MERN Developer
```

---

## 📜 License

This project is created for educational and assessment purposes.