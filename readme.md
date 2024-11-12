# CRUD OPERATIONS

## Overview

This application is built using **react.js** framework. It displays efficient crud operations includes:

- **Render List of User**
- **Add New User**
- **Update User**
- **Delete User**

## Tech Stack

- **Frontend**:

  - React.js
  - TypeScript
  - Vite
  - Context API
  - Tailwind CSS

- **Backend**:

  - Express.js
  - TypeScript
  - JSON for database storage
  
## Installation

To run this project locally, follow these steps:

1. **Clone the repository:he repository:**

```bash
   git clone https://github.com/probhask/react-crud.git
```


2. **Install dependencies for both frontend and backend:**

```bash
 cd client
 npm install
 cd ..
 cd server
 npm install
```

3. **set url**
   For API Integration

- **Frontend:**
  Create .env file in `client` folder and paste this code

```bash
  VITE_BACKEND_URL=http://localhost:5000
```

- **Backend:**
  Create .env file in `server` folder and paste this code

  For example: `http://localhost:5173` is react running and `5000` is the port where backend will run

```bash
  PORT=5000
  FRONTEND_URL=http://localhost:5173
  BACKEND_URL=http://localhost:5000/
```

1. **Run the frontend and backend:**

- **Frontend:**

```bash
  npm run dev
```

- **Backend:**

```bash
  npm run dev
```

Now frontend and backend should be running.
  
---