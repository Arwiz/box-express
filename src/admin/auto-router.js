import express from 'express';
import {
    GetAllMetaModules,
    GetDataFromDynamicModule,
    InsertDataInDynamicModule,
} from "./controller/auto.controller";
const router = express.Router();

// Find route and put handler
router.route('/')
    .get(GetAllMetaModules)
    //.post(CreateMetaModuleData)

// Find route and put handler
router.route('/*/')
    .get(GetDataFromDynamicModule)
    .post(InsertDataInDynamicModule)

// router.route('/metamodules/:id')
//     .get(GetTeamByIdHandler)
//     .put(UpdateTeamByIdHandler)
//     .delete(DeleteTeamByIdHandler)

export default router;