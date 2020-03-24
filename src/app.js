import express from 'express';
import authRouter from "./auth/auth-router";
import adminRouter from './admin/admin-router'
const app = new express();

// Routing Handling
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/user',adminRouter);
export default  app;