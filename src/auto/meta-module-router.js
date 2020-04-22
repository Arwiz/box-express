import express from 'express';
import {
    CreateMetaModules,
    GetAllMetaModules,
    PublishTheModule,
    GetMetaModulesByIdHandler,
    UpdateMetaModulesByIdHandler,
    DeleteMetaModulesByIdHandler,
    ClearAllMetaModules
} from "./controller/meta.module.controller";

const router = express.Router();

// Find route and put handler
router.route('/')
    .get(GetAllMetaModules)
    .post(CreateMetaModules)
    .delete(ClearAllMetaModules)

router.route('/publish/:id')
    .put(PublishTheModule)

router.route('/:id')
    .get(GetMetaModulesByIdHandler)
    .put(UpdateMetaModulesByIdHandler)
    .delete(DeleteMetaModulesByIdHandler)








export default router;