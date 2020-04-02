import express from 'express';
import errorHandler from "./shared/middleware/errorHandler";
import adminRouts from "./admin";
import authRoutes from "./auth";
import mongoSanitize from 'express-mongo-sanitize'

import cors from 'cors'
const app = new express();

// Body Parser
app.use(express.json());
app.use(cors());

// Remove any keys containing prohibited characters
app.use(mongoSanitize());

// @desc Health Check API
app.get('/', function (req, res) {
    res.send('Health Check Fine')
});

// Set up Auth routes
authRoutes(app);
// Set up Admin routes
adminRouts(app);

// Add Error Middleware
app.use(errorHandler);

export default app;