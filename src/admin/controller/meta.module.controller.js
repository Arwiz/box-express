/* ****************************************************************************
*  Model Handler : MetaModules
******************************************************************************/

import asyncHandler from "../../shared/middleware/asyncHandler";
import {MetaModule, ModuleStatus} from '../../shared'
import schemaDesignFromMetaModule from "../../shared/helpers/schema.helper";
import mongoose from "mongoose";
import {fullCamelCase} from "../../shared/helpers/util.fun";
import pluralize from 'pluralize';


// @desc  Get All schemas
// @method GET
// @url /schemas

export const GetAllMetaModules = asyncHandler(async (req, res, next) => {
    const results = await MetaModule.find();
    res.status(200).json({success: true, data: results});
});

// @desc  Create new MetaModules
// @method POST
// @url /schemas
// 1) = > Create Meta Module
export const CreateMetaModules = asyncHandler(async (req, res, next) => {
    if (req.body) {
        let {clientId, projectId, moduleName, fields} = req.body;
        moduleName = fullCamelCase(moduleName);
        const moduleId = pluralize(moduleName).toLowerCase();
        moduleName = pluralize.singular(moduleName);
        const newObject = {clientId, projectId, status: 'DRAFT', moduleId, moduleName, fields};
        const addStatus = await MetaModule.create(newObject);
        res.status(201).json({success: true, data: addStatus})
    } else {
        next(Error('Please provide data'));
    }
});

export const ClearAllMetaModules = asyncHandler(async (req, res, next) => {
    if (req.body) {
        const addStatus = await MetaModule.deleteMany();
        res.status(200).json({success: true, data: addStatus})
    } else {
        next(Error('Please provide data'));
    }
});


export const PublishTheModule = asyncHandler(async (req, res, next) => {
    if (req.body) {
        const id = req.params.id;
        const metaModule = await MetaModule.findById(id);
        if (metaModule.status !== 'PUBLISHED') {
            const schema = schemaDesignFromMetaModule(metaModule);

            const addStatus = await ModuleStatus.create({
                clientId: metaModule.clientId,
                moduleName: metaModule.moduleName,
                moduleId: metaModule.moduleId,
                moduleSchema: JSON.stringify(schema),
                status: 'PUBLISHED'
            });
            res.status(201).json({success: true, data: addStatus})
        }
        res.status(201).json({success: true, message: 'Already Published'});
    } else {
        next(Error('Please provide data'));
    }
});


export const ClearPublishModule = asyncHandler(async (req, res, next) => {
    if (req.body) {
        const addStatus = await ModuleStatus.deleteMany();
        res.status(200).json({success: true, data: addStatus})
    } else {
        next(Error('Please provide data'));
    }
});

//
// /*  Update/Delete with ID*/
//
// @desc  Get Id Handler
// @method GET
// @url /schemas/:id
export const GetMetaModulesByIdHandler = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const results = await MetaModule.findById(id);
    res.status(200).json({success: true, data: results});
});


// @desc Update Handler Function
// @method PUT
// @url /schemas/:id
export const UpdateMetaModulesByIdHandler = asyncHandler(async (req, res, next) => {

    const {clientId, moduleId, moduleName, fields} = req.body;
    const newObject = {clientId, moduleId, moduleName, fields}
    const id = req.params.id;

    const addStatus = await MetaModule.findOneAndReplace({_id: id}, {...newObject});
    res.status(201).json({success: true, data: addStatus})
});

//
// // @desc  Delete Handler Function
// // @method delete
// // @url /schemas/:id
export const DeleteMetaModulesByIdHandler = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const addStatus = await MetaModule.deleteOne({_id: id});
    res.status(200).json({success: true, message: `Successfully deleted ${id}`})
});

