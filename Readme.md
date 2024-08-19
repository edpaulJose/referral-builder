
# Referral Builder

## Overview
Referral Builder is a full-stack web application designed to handle referral programs. The project is divided into two main parts: the client (frontend) and the server (backend).

## Table of Contents
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Scripts](#scripts)
- [License](#license)

## Installation

### Step 1: Clone the Repository
Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/yourusername/referral-builder.git
```

### Step 2: Install Dependencies
Navigate to the root directory of the project and install the dependencies:

```bash
npm install
```

Next, install the dependencies for both the client and server:

```bash
npm run install:client
npm run install:server
```

## Database Setup

To set up the database, follow these steps:

1. **Install MongoDB**: If you don't have MongoDB installed, download and install it from [MongoDB's official website](https://www.mongodb.com/try/download/community).

2. **Run MongoDB**: Start the MongoDB server using the following command:

    ```bash
    mongod
    ```

3. **Create a Database**: You can create a new database for the project using a MongoDB client like `mongo` shell or a GUI tool like MongoDB Compass.

## Environment Variables

You need to configure environment variables for both the client and server. Sample `.env` files are provided for both parts of the application.

### Step 1: Server Environment Variables
Navigate to the `server` directory and copy the `.env.sample` file to create your own `.env` file:

```bash
cp server/.env.sample server/.env
```

Update the `.env` file with the appropriate values for your environment.

### Step 2: Client Environment Variables
Navigate to the `client` directory and copy the `.env.sample` file to create your own `.env` file:

```bash
cp client/.env.sample client/.env
```

Update the `.env` file with the appropriate values for your environment.

## Running the Application

After setting up the dependencies and the database, you can run the application.

### Step 1: Start Both Server and Client
To run both the server and client simultaneously, use the following command:

```bash
npm run dev
```

### Step 2: Start Server Only
To run only the server, use:

```bash
npm run server
```

### Step 3: Start Client Only
To run only the client, use:

```bash
npm run client
```

## Scripts

- **`npm run install:client`**: Installs dependencies for the client.
- **`npm run install:server`**: Installs dependencies for the server.
- **`npm run dev`**: Runs both the client and server concurrently.
- **`npm run server`**: Runs only the server.
- **`npm run client`**: Runs only the client.
