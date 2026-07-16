# 💸 SpendWise - MERN Stack Expense Tracker

SpendWise is a full-stack personal finance tracker designed to help users log their daily transactions, categorize expenses, and visualize their spending habits over time. Built using the MERN (MongoDB, Express, React, Node.js) stack.

---

## 🚀 Features

*   **User Authentication:** Secure signup, login, and password hashing using JWT and bcrypt.
*   **Transaction Management:** Seamlessly add, view, edit, and delete income and expense records.
*   **Dynamic Visualizations:** Interactive charts (pie and bar charts) to analyze spending by category and monthly trends.
*   **Category Filtering:** Filter transactions by date range, type (income/expense), or specific categories.
*   **Responsive Design:** Optimized for mobile, tablet, and desktop screens.
*   **Real-time Summary:** Instantly updated dashboard showing total balance, total income, and total expenses.

---

## 🛠️ Tech Stack

**Client:**
*   **React.js** (v18+)
*   **Redux Toolkit** (or React Context API for state management)
*   **Chart.js** / **Recharts** (for data visualization)
*   **Tailwind CSS** (for styling)
*   **Axios** (for API requests)

**Server:**
*   **Node.js** & **Express.js** (REST API)
*   **MongoDB** (Database)
*   **Mongoose** (ODM)
*   **JSON Web Tokens (JWT)** (Authentication)
*   **Bcryptjs** (Password hashing)

---

## ⚙️ Installation & Setup

Follow these steps to run the application locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed on your system.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/spendwise-expense-tracker.git](https://github.com/your-username/spendwise-expense-tracker.git)
cd spendwise-expense-tracker

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development

REACT_APP_API_URL=http://localhost:5000/api

cd backend
npm install
npm run dev # Starts server using nodemon

cd client
npm install
npm start # Starts React development server
