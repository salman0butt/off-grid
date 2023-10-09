# Off Grid

This project is an authentication system with a dashboard that displays chart data and allows users to generate data by clicking on the "Generate" button.


## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Application](#running-the-application)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed on your local machine.
- [Vite](https://vitejs.dev/) Vite Next Generation Frontend Tooling
- [Vue](https://cli.vuejs.org/guide/installation.html) for frontend development.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/salman0butt/off-grid.git
   ```

2. Navigate to the project directory:

   ```bash
   cd off-grid
   ```

3. Install dependencies for both the frontend and backend:

   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

## Running the Application

Follow these steps to run the application locally:

1. Start the backend server:

   ```bash
   # Navigate to the backend directory
   cd backend

   # Start the Node.js server
   npm run start or npm run dev
   ```

   The backend server should now be running on `http://localhost:3000`.

2. Start the Vue.js frontend:

   ```bash
   # Navigate to the frontend directory
   cd ../frontend

   # Start the Vue development server
   npm run dev
   ```

   The frontend should now be accessible at `http://localhost:5173`.
