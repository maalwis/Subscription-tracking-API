// Importing the express library (which helps create a web server)
import express from 'express';
import cookieParser from 'cookie-parser';

import {PORT} from "./config/env.js";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDB from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

// Creating an instance of an Express application
// `app` is the main object we use to define routes and middleware
const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscription', subscriptionRouter);

app.use(errorMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);


// Setting up a GET route
app.get("/", (req, res) => {
    // Sending a response with the text "Welcome"
    res.send("Welcome");
});

// Starting the server on port PORT - app.listen()` makes the server start listening for requests
app.listen(PORT, async () => {
    // Logging a message to the console when the server starts
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Port: ${process.env.PORT}`);

    await connectToDB();


});

// Exporting the `app` object so it can be used in other files
// `export default` is a TypeScript/ES6 feature for sharing code between files
export default app;
