# Project Overview

This repository contains the source code for the ChefsAura application, including both the frontend and backend components.

## Notes

- Ensure that you have the required prerequisites installed for both the frontend and backend before setting up the project.
- Follow the setup instructions in the respective README files for the frontend and backend to get the project running.

## Data Parsing

The data parsing in this project is handled as follows:

1. **Backend**: The backend receives raw data from various sources (e.g., user input, external APIs) and processes it using Java Servlets. The data is validated, transformed, and stored in the database.

2. **Frontend**: The frontend, built with Node.js and Vite+React, fetches data from the backend using RESTful APIs. The data is then parsed and displayed in the user interface using React components. The frontend also handles user input and sends it back to the backend for processing.

This ensures that the data is consistently processed and displayed across the application.

## What are RESTful APIs?

RESTful APIs (Representational State Transfer) are a type of web service that follows the principles of REST architecture. They use standard HTTP methods (GET, POST, PUT, DELETE) to perform operations on resources, which are identified by URLs. RESTful APIs are stateless, meaning each request from a client to a server must contain all the information needed to understand and process the request. This makes them scalable and easy to maintain.
