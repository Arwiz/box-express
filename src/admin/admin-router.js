import express from 'express';
import {CreateOrganizationHandler, GetAllOrganizationsHandler, GetOrganizationHandler} from "./controller/orgnization.controller";
const router = express.Router();

// Find route and put handler
router.route('/*')
    .get(GetAllOrganizationsHandler)
    .post(CreateOrganizationHandler)

// router.route('/:id')
//     .get(GetUserByIdHandler)
//     .put(GetUserByIdHandler)
//     .delete(GetUserByIdHandler)



export default router;