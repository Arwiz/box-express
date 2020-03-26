import express from 'express';
import {loginHandler} from "../controller/auth.controller";
import {CreateUserHandler, GetAllUsersHandler, GetUserByIdHandler} from "../controller/user.controller";
import {protect, authorize} from '../middleware/auth'
const router = express.Router();
// Find route and put handler
router.route('/login').post(loginHandler)

router.use(protect);
// Find route and put handler
router.route('/')
    .get(GetAllUsersHandler)
    .post(CreateUserHandler)


router.route('/:id')
    .get(GetUserByIdHandler)
    .put(GetUserByIdHandler)
    .delete(GetUserByIdHandler)

export default router;