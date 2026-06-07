# Expense Tracker

A full-stack expense tracking application built with React, Node.js, Express, PostgreSQL, Prisma, and TypeScript.

## Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

### Expense Management
- Add Expense
- Edit Expense
- Delete Expense
- View Expense History
- Search Expenses
- Filter by Category
- Pagination

### Dashboard
- Total Expenses
- Monthly Expenses
- Recent Transactions
- Expense Breakdown Pie Chart

### UI
- Responsive Design
- Dark Mode
- Form Validation with Zod
- Loading States

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- React Hook Form
- Zod
- Tailwind CSS
- Recharts
- Axios

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Bcrypt

## Live Demo

Frontend:
https://expense-tracker-git-main-harshal997s-projects.vercel.app/

Backend:
https://expense-tracker-9i54.onrender.com/

## Local Setup

### Clone Repository

```bash
git clone <repo-url>
cd expense-tracker
```

### Backend

```bash
cd backend

npm install

cp .env.example .env

npm run prisma:migrate

npm run dev
```

### Frontend

```bash
cd frontend

npm install

cp .env.example .env

npm run dev
```

## Environment Variables

### Backend

```env
DATABASE_URL=
JWT_SECRET=
PORT=5000
```

### Frontend

```env
VITE_API_URL=
```

## Deployment

- Frontend deployed on Vercel
- Backend deployed on Render
- PostgreSQL hosted on Render

## Future Improvements

- Budget Management
- Recurring Expenses
- Export to CSV
- Advanced Analytics
- Email Notifications
