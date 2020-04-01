import express from 'express';
import errorHandler from "./shared/middleware/errorHandler";
import adminRouts from "./admin";
import authRoutes from "./auth";

import cors from 'cors'
const app = new express();

// Body Parser
app.use(express.json());
app.use(cors());

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