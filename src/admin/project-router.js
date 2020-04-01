import express from 'express';
import {
    CreateProject, DeleteProjectByIdHandler,
    GetAllProjects,
    GetProjectByIdHandler,
    UpdateProjectByIdHandler
} from "./controller/project.controller";
const router = express.Router();

// Find route and put handler
router.route('/')
    .get(GetAllProjects)
    .post(CreateProject)

router.route('/:id')
    .get(GetProjectByIdHandler)
    .put(UpdateProjectByIdHandler)
    .delete(DeleteProjectByIdHandler)

export default router;