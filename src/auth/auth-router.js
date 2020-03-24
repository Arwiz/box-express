import express from 'express';
import {loginHandler} from "./controller/auth.controller";
const router = express.Router();
// Find route and put handler
router.route('/login').post(loginHandler)
export default router;