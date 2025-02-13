// Importing the express library (which helps create a web server)
import express from 'express';

// Creating an instance of an Express application
// `app` is the main object we use to define routes and middleware
const app = express();

// Setting up a GET route
app.get("/", (req, res) => {
    // Sending a response with the text "Welcome"
    res.send("Welcome");
});

// Starting the server on port 8080 - app.listen()` makes the server start listening for requests
app.listen(8080, () => {
    // Logging a message to the console when the server starts
    console.log("Server is running on http://localhost:8080");
});

// Exporting the `app` object so it can be used in other files
// `export default` is a TypeScript/ES6 feature for sharing code between files
export default app;
