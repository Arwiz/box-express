import express from 'express';
import {
    CreateOrganizationHandler,
    DeleteOrganizationByIdHandler,
    GetAllOrganizationsHandler,
    UpdateOrganizationByIdHandler,
    GetOrganizationByIdHandler
} from "./controller/orgnization.controller";
const router = express.Router();

/**
 * @swagger
 * /abc:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */


// Find route and put handler
router.route('/')
    .get(GetAllOrganizationsHandler)
    .post(CreateOrganizationHandler)

router.route('/:id')
    .get(GetOrganizationByIdHandler)
    .put(UpdateOrganizationByIdHandler)
    .delete(DeleteOrganizationByIdHandler)


export default router;