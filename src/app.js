import express from 'express';
import errorHandler from "./shared/middleware/errorHandler";
import { authRouter, userRouter} from "./auth";

const app = new express();

// Body Parser
app.use(express.json());

// @desc Health Check API
app.get('/', function (req, res) {
    res.send('Health Check Fine')
});


// Routing Handling
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

// Add Error Middleware
app.use(errorHandler);

export default app;