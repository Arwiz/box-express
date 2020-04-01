import express from 'express';
import errorHandler from "./shared/middleware/errorHandler";
import { authRouter, userRouter} from "./auth";
import  adminRouter from "./admin/admin-router";

import cors from 'cors'
const app = new express();

// Body Parser
app.use(express.json());
// app.use(cors());

// @desc Health Check API
app.get('/', function (req, res) {
    res.send('Health Check Fine')
});


// Routing Handling
// app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/users', userRouter);
app.use('/api/v1', adminRouter);


// Add Error Middleware
app.use(errorHandler);

export default app;