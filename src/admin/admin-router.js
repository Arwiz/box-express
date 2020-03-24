import express from 'express';
import {AddUserHandler} from "./controller/admin.controller";
const router = express.Router();
// Find route and put handler
router.route('/users')
    .get(AddUserHandler)
    .post(AddUserHandler)


router.route('/:id')
    .patch(AddUserHandler)
    .delete(AddUserHandler)



export default router;