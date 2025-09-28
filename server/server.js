// 1. Import Dependencies
// The 'require' function is Node.js's way of importing modules.
// We are importing the 'express' framework and the 'cors' middleware.
const express = require('express');
const cors = require('cors');


require('dotenv').config();

// Import the router we created in jobRoutes.js
// The './' is important because it specifies that we are requiring a local file,
// not a package from node_modules.
const jobRoutes = require('./routes/jobRoutes');


// 2. Initialize Express Application
// We call the express() function to create a new Express application instance.
// The 'app' object is the heart of our server, used to configure routes, middleware, and more.
const app = express();

// 3. Define a Port
// We define the port number our server will listen on.
// It's a common practice to use an environment variable (process.env.PORT) for the port,
// which is essential for deployment. For local development, we provide a fallback to port 5000.
const PORT = process.env.PORT || 5000;

// 4. Configure Middleware
// Middleware are functions that execute during the request-response cycle.
// app.use() is how you apply middleware to your application.

// Enable Cross-Origin Resource Sharing (CORS) for all incoming requests.
// This is crucial for allowing our React frontend (on a different origin) to make requests to this backend.
app.use(cors());

// Enable the built-in Express middleware to parse JSON request bodies.
// When a client sends data in JSON format (e.g., in a POST request), this middleware
// parses it and makes it available in the `req.body` object.
app.use(express.json());


// ===================== ADD YOUR ROUTE HERE =====================

// 5. Define a Basic Route (Health Check)
// This route will be used to verify that the server is running and can respond to requests.
// It's a GET request to the path '/api/health'.
app.get('/api/health', (req, res) => {
  // When a request hits this endpoint, we'll send back a JSON response.
  // The 'res.json()' method automatically stringifies the object and sets the
  // correct 'Content-Type: application/json' header.
  res.json({
    status: 'ok',
    message: 'Server is healthy and ready to accept requests.'
  });
});

// Mount the job routes.
// This tells our Express app to use the jobRoutes router for any request
// that starts with the path '/api/jobs'.
// For example, a GET request to /api/jobs will be handled by the GET '/'
// route defined inside jobRoutes.js.
app.use('/api/jobs', jobRoutes);


// console.log('Adzuna App ID:', process.env.ADZUNA_APP_ID);

// 6. Start the Server
// The app.listen() method binds the server to the specified port and starts listening for incoming connections.
// The second argument is a callback function that gets executed once the server is successfully running.
// We log a message to the console to get visual confirmation.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});