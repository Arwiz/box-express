/* ****************************************************************************
*  Model Handler : MetaModules
******************************************************************************/

import asyncHandler from "../../shared/middleware/asyncHandler";
import {MetaModule} from '../models'
import mongoose from "mongoose";
import schemaDesignFromMetaModule, {getDynamicModuleByUrl} from "../../shared/helpers/schema.helper";


// @desc  Get All schemas
// @method GET
// @url /schemas


/**
 * @swagger
 * /api/v1/auto/{moduleNameInPlural}:
 *   get:
 *     tags:
 *       - Auto CRUD Module
 *     name: Find All The Data of a module
 *     summary: Finds a list under given module name
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: moduleNameInPlural
 *         schema:
 *           type: string
 *         required:
 *           - moduleNameInPlural
 *     responses:
 *       '200':
 *         description: A single user object
 */

export const GetDataFromDynamicModule = asyncHandler(async (req, res, next) => {
    let dataUrl = req.url;
    dataUrl = dataUrl.replace(/\//gi, '');
    // Get The schema from the Collection
    const foundModel = await getDynamicModuleByUrl(dataUrl);
    if (foundModel) {
        const results = await foundModel.find({});
        res.status(200).json({success: true, data: results});
    } else {
        next(Error('Module not available or Not published'));
    }
});


// @desc  Create new MetaModules
// @method POST
// @url /schemas

/**
 * @swagger
 * /api/v1/auto/{moduleNameInPlural}:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: moduleNameInPlural
 *         description: Username to use for login.
 *         in: path
 *         required: true
 *         type: string
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: object
 *         properties:
 *         id:
 *          type: string
 *         firstName:
 *          type: string
 *     responses:
 *       200:
 *         description: login
 */

export const InsertDataInDynamicModule = asyncHandler(async (req, res, next) => {
    if (req.body) {
        const row = req.body;
        let dataUrl = req.url;
        dataUrl = dataUrl.replace(/\//gi, '');
        // Get The schema from the Collection
        const foundModel = await getDynamicModuleByUrl(dataUrl);
        if (foundModel) {
            const addStatus = await foundModel.create(row);
            res.status(200).json({success: true, data: addStatus})
        } else
            next(Error('Module not available or Not published'));
    } else {
        next(Error('Please provide data'));
    }
});

//
// /*  Update/Delete with ID*/
//
// // @desc  Get Id Handler
// // @method GET
// // @url /schemas/:id
export const GetMetaModulesByIdHandler = asyncHandler(async (req, res, next) => {
    let dataUrl = req.url;
    const id = req.params.id;
    dataUrl = dataUrl.replace(/\//gi, '');
    // Get The schema from the Collection
    const foundModel = await getDynamicModuleByUrl(dataUrl);
    if (foundModel) {
        const results = await foundModel.find({id});
        res.status(200).json({success: true, data: results});
    } else {
        next(Error('Module not available or Not published'));
    }
});

//
// @desc Update Handler Function
// @method PUT
// @url /schemas/:id
export const UpdateMetaModulesByIdHandler = asyncHandler(async (req, res, next) => {
    let dataUrl = req.url;
    const id = req.params.id;
    dataUrl = dataUrl.replace(/\//gi, '');
    const newObject = {...req.body};
    // Get The schema from the Collection
    const foundModel = await getDynamicModuleByUrl(dataUrl);
    const addStatus = await foundModel.findOneAndReplace({_id: id}, {...newObject});
    res.status(201).json({success: true, data: addStatus})
});
//
// // @desc  Delete Handler Function
// // @method delete
// // @url /schemas/:id

// /**
//  * @swagger
//  * /api/v1/auto/{moduleNameInPlural}/{id}:
//  *   delete:
//  *     tags:
//  *       - Auto CRUD Module
//  *     name: Delete Data of a module
//  *     summary: Delete Data of a module
//  *     parameters:
//  *     - in: path
//  *         name: moduleNameInPlural
//  *         schema:
//  *           type: string
//  *         required:
//  *           - moduleNameInPlural
//  *        name: id
//  *        schema:
//  *          type: string
//  *        required:
//  *          - id
//  *     responses:
//  *       '200':
//  *         description: A single user object
//  */

export const DeleteMetaModulesByIdHandler = asyncHandler(async (req, res, next) => {
    const id = req.params.id
    let dataUrl = req.url;
    dataUrl = dataUrl.replace(/\//gi, '');
    // Get The schema from the Collection
    const foundModel = await getDynamicModuleByUrl(dataUrl);
    const addStatus = await foundModel.deleteOne({_id: id});
    res.status(200).json({success: true, message: `Successfully deleted ${id}`})
});
