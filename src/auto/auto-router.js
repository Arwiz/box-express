import express from 'express';
import {
    DeleteMetaModulesByIdHandler,
    GetDataFromDynamicModule, GetMetaModulesByIdHandler,
    InsertDataInDynamicModule, UpdateMetaModulesByIdHandler,
} from "./controller/auto.controller";
const router = express.Router();


// Find route and put handler
//
// router.route('/')
//     .get(GetAllMetaModules)
//     //.post(CreateMetaModuleData)

// Find route and put handler
router.route('/*/')
    .get(GetDataFromDynamicModule)
    .post(InsertDataInDynamicModule)

router.route('/*/:id')
    .get(GetMetaModulesByIdHandler)
    .put(UpdateMetaModulesByIdHandler)
    .delete(DeleteMetaModulesByIdHandler)

export default router;