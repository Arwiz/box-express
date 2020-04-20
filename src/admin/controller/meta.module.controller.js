/* ****************************************************************************
*  Model Handler : MetaModules
*
*
******************************************************************************/
// @flow
// 1)  Get All Meta Modules
// 2)  Create Meta Modules
// 3)  Delete All Meta Modules

// 4)  Put Publish Meta Module
// 5)  Get All Meta Modules

// 7) Put meta module by Id
// 7) Delete particular meta module by Id


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

// @desc  All MetaModules
// @method DELETE
// @url /schemas

export const ClearAllMetaModules = asyncHandler(async (req, res, next) => {
        const addStatus = await MetaModule.deleteMany();
        res.status(200).json({success: true, data: addStatus})
});



// @desc  All MetaModules
// @method PUT
// @url /metamodules/publish/:id
export const PublishTheModule = asyncHandler(async (req, res, next) => {
    if (req.body) {
        const id = req.params.id;
        const status = req.body.status;
        const foundDataModel = await MetaModule.findById(id);
        const sch =  schemaDesignFromMetaModule(foundDataModel);
        const checkedThenGetDynamicModule = await mongoose.models[foundDataModel.moduleName] || await mongoose.model(foundDataModel.moduleName, sch);
        let updateStatus =  false;
        if(checkedThenGetDynamicModule){
             updateStatus = await foundDataModel.updateOne({_id: id}, { $set: { status: status } });
        }
        // Update all documents in the `mymodels` collection
        res.status(201).json({success: true, data: updateStatus})
    } else {
        next(Error('Please provide data..!'));
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
// @url /metamodules/:id
export const UpdateMetaModulesByIdHandler = asyncHandler(async (req, res, next) => {
    const {clientId, moduleId, moduleName, fields} = req.body;
    const newObject = {clientId, moduleId, moduleName, fields}
    const id = req.params.id;
    const addStatus = await MetaModule.findOneAndReplace({_id: id}, {...newObject});
    res.status(201).json({success: true, data: addStatus})
});


// // @desc  Delete Handler Function
// // @method delete
// // @url /metamodules/:id
export const DeleteMetaModulesByIdHandler = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const addStatus = await MetaModule.deleteOne({_id: id});
    res.status(200).json({success: true, message: `Successfully deleted ${id}`})
});

