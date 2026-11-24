# Budget Buddy - Expense Tracker

A full-stack personal finance app to track income and expenses, see where your money goes, and understand spending trends through clear charts. Built with the MERN stack.

## Features

- **Secure authentication:** sign up and log in with JWT-based authentication, with a password visibility toggle on the login form
- **Dashboard overview:** Total Balance, Total Income and Total Expense at a glance
- **Recent transactions:** the latest income and expense entries in one list
- **Financial overview chart:** a doughnut chart comparing balance, income and expenses
- **Income management:** add income with an icon, source, amount and date, and view earnings over time in a bar chart
- **Expense management:** add expenses with an icon, category, amount and date, and track spending trends in a chart
- **Last 30 days expenses and last 60 days income** charts on the dashboard
- **Download reports:** export income and expense data as a CSV file
- **Responsive UI:** clean sidebar navigation and card-based layout

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React.js, Vite, CSS, Chart.js |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JSON Web Tokens (JWT) |

## How It Works

1. A user signs up and logs in. The server returns a JWT, which is used for all protected API calls.
2. Income and expense entries are stored in MongoDB against the logged-in user, so every user sees only their own data.
3. The dashboard fetches totals and recent entries from the REST API and renders them with Chart.js.
4. The Download button converts the entries into a CSV file for offline use.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB (local installation or a MongoDB Atlas connection string)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/Suhanisg/Expense_Tracker.git
   cd Expense_Tracker
   ```

2. Set up the backend

   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the `server` folder:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

   Start the server:

   ```bash
   npm start
   ```

3. Set up the frontend

   ```bash
   cd client
   npm install
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

## Planned Improvements

- Edit and delete transactions
- Filter entries by category and date range
- Monthly budget limits with alerts

## Author

**Suhani Goyal**
[GitHub](https://github.com/Suhanisg) | [LinkedIn](https://linkedin.com/in/suhanisg)
