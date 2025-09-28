// 1. Import the Express library
// We need Express to create the router instance.
const express = require('express');

// 2. Create a new Router instance
// The Router is like a mini-app, capable of having its own middleware and routes.
// We will define all our job-related routes on this 'router' object.
const router = express.Router();

// @route   GET /
// @desc    Get a list of jobs from the Adzuna API
// @access  Public
router.get('/', async (req, res) => { // <-- MAKE THE HANDLER ASYNC
   try {
    // Construct the URL for the Adzuna API using template literals.
    // This is a secure and clean way to build the request URL.
    const apiUrl = `http://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${process.env.ADZUNA_APP_ID}&app_key=${process.env.ADZUNA_API_KEY}&results_per_page=10&what=javascript%20developer&content-type=application/json`;

    // Await the response from the API using the dynamically constructed URL.
    const response = await axios.get(apiUrl);

     // 1. Check if the results array exists in the response from Adzuna.
    // The actual job listings are nested inside the 'results' property of the response data.
    const rawJobs = response.data.results || [];

    // 2. Standardize the data using the Array.prototype.map() method.
    // We create a new array ('standardizedJobs') by transforming each 'job'
    // from the 'rawJobs' array into a new object with our desired structure.
    const standardizedJobs = rawJobs.map(job => ({
      // Our defined 'id' property will be the 'id' from the Adzuna job object.
      id: job.id,

      // Our 'title' will be the 'title' from Adzuna.
      title: job.title,

      // Our 'company' will be the 'display_name' nested inside Adzuna's 'company' object.
      company: job.company.display_name,

      // Our 'location' will be the 'display_name' nested inside Adzuna's 'location' object.
      location: job.location.display_name,

      // Our 'description' will be the 'description' from Adzuna.
      description: job.description,

      // Our 'url' will map to the 'redirect_url' from Adzuna.
      url: job.redirect_url
    }));

    // 3. Send the clean, standardized data back to the client.
    // Instead of sending the raw 'response.data', we now send our beautiful new array.
    res.json(standardizedJobs);

  } catch (error) {
    // This 'catch' block is the safety net. It executes ONLY if an error
    // occurs at any point in the 'try' block above.

    // --- 1. Log Detailed Error for the Developer ---
    // We log a clear message to our server's console for debugging purposes.
    console.error('An error occurred while fetching jobs from the external API:');

    // Axios provides a very detailed error object. We can inspect it to find out
    // exactly what kind of error occurred. This is invaluable for debugging.
    if (error.response) {
      // This means the request was made and the Adzuna server responded with an error
      // status code (like 401 Unauthorized, 403 Forbidden, or 404 Not Found).
      console.error(`API Error: Status ${error.response.status}`);
      console.error('Response Data:', error.response.data);
    } else if (error.request) {
      // This means the request was made but no response was received. This is typically
      // a network error (e.g., no internet connection, or the Adzuna server is down).
      console.error('No response received from API. Request details:', error.request);
    } else {
      // This means an error occurred while setting up the request itself.
      console.error('Error setting up the request:', error.message);
    }

    // --- 2. Send a Generic and Safe Response to the Client ---
    // We use a 500 'Internal Server Error' status code to signal to the client
    // that something went wrong on our server's end.
    // It's a critical security practice to NOT send the raw 'error' object
    // or its details to the client, as it can leak sensitive information about
    // our server's architecture or internal workings.
    res.status(500).json({
      message: 'Failed to fetch job listings. Please try again later.'
    });
  }
});

// 3. Export the router
// We need to export the router so that we can 'require' it in our main server.js file.
// This makes the routes defined in this file available to the rest of our application.
module.exports = router;