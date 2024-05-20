# Sensor Data Application

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Backend](#backend)
  - [Technologies Used](#technologies-used)
  - [API Endpoints](#api-endpoints)
- [Frontend](#frontend)
  - [Technologies Used](#technologies-used-1)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (>= 20.x)
- npm (>= 6.x) or yarn (>= 1.x)

This application was only tested on macOS 14.4.1.

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/sensor-data-app.git
   cd sensor-data-app
   ```

2. **Install dependencies for both backend and frontend:**
   ```sh
   cd backend
   npm run setup
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server:**
   ```sh
   cd backend
   npm run dev
   ```

2. **Start the frontend development server:**
   ```sh
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` to see the application in action. Some dummy data is already present since the [SQLite database file](/backend/prisma/dev.db) is also included in the repository.

## Backend

### Technologies Used

- [Fastify](https://www.fastify.io/) - The server
- [Prisma](https://www.prisma.io/) - The ORM
- [Zod](https://zod.dev/) - For incoming requests data validation
- [SQLite](https://www.sqlite.org/index.html) - The database

### API Endpoints

#### GET /sensors/data
- Description: Retrieve a list of all sensors.
- Response: `200 OK`, JSON array of sensor objects.

#### POST /sensors/data
- Description: Create a new sensor data entry.
- Request Body: JSON object containing sensor data (validated by Zod).
- Response: `201 Created`, JSON object of the created sensor.

## Frontend

### Technologies Used

- [Vite](https://vitejs.dev/) - The build tool
- [React](https://reactjs.org/) - The frontend framework
- [ShadCN components](https://github.com/shadcn/components) - The base UI components
- [Tailwind CSS](https://tailwindcss.com/) - The CSS framework
- [Tanstack Query](https://tanstack.com/query/latest) - Data fetching state management store. It also allows to to periodically refresh the fetched data.
