/* ****************************************************************************
*  Model Handler : MetaModules
******************************************************************************/

import asyncHandler from "../../shared/middleware/asyncHandler";
import {MetaModule, ModuleStatus} from '../../shared'
import mongoose from "mongoose";


// @desc  Get All schemas
// @method GET
// @url /schemas

export const GetAllMetaModules = asyncHandler(async (req, res, next) => {
    const results = await ModuleStatus.find();
    res.status(200).json({success: true, data: results});
});

export const GetDataFromDynamicModule = asyncHandler(async (req, res, next) => {
    let dataUrl =  req.url;
    dataUrl = dataUrl.replace(/\//gi,'');
    // Get The schema from the Collection
    let moduleData =  await ModuleStatus.find({ moduleName: dataUrl});
    // Call Dynamic

    const sch =  JSON.parse(moduleData.moduleSchema);
    let dynamicModuleFound =  await mongoose.model(moduleData.moduleName,sch);
     // Get All result
     const results  = dynamicModuleFound.find({});
    res.status(200).json({success: true, data: results});
});


// @desc  Create new MetaModules
// @method POST
// @url /schemas

export const InsertDataInDynamicModule = asyncHandler(async (req, res, next) => {
    if (req.body) {

        const row = req.body;
        let dataUrl =  req.url;
        dataUrl = dataUrl.replace(/\//gi,'');
        // Get The schema from the Collection
        let moduleData =  await ModuleStatus.find({ moduleId: dataUrl});

        if(moduleData && moduleData.length>0){
            const foundDataModel = moduleData[0];
            // Call Dynamic
            const sch =  JSON.parse(foundDataModel.moduleSchema);
            console.log(sch);

            let dynamicModuleFound =  await mongoose.model(foundDataModel.moduleName, sch);
            const addStatus = await dynamicModuleFound.create(row);
            res.status(201).json({success: true, data: addStatus})
        }
        else
            res.status(200).json({success: true, data: "Data Not Found"});

    }else{
        next(Error('Please provide data'));
    }
});

//
// /*  Update/Delete with ID*/
//
// // @desc  Get Id Handler
// // @method GET
// // @url /schemas/:id
// export const GetMetaModulesByIdHandler =  asyncHandler(async (req, res, next) => {
//     const id = req.params.id;
//     const results = await MetaModules.findById(id);
//     res.status(200).json({success: true, data: results});
//     res.send('Get Organization Handler Called');
// });
//
// // @desc Update Handler Function
// // @method PUT
// // @url /schemas/:id
// export const UpdateMetaModulesByIdHandler = asyncHandler( async (req, res, next) => {
//     const newObject = {MetaModulesName: req.body.MetaModulesName};
//     const id = req.params.id;
//     const addStatus = await MetaModules.findOneAndReplace({ _id: id}, {...newObject});
//     res.status(201).json({success: true, data: addStatus})
//     res.send('Get Organization Handler Called');
// });
//
// // @desc  Delete Handler Function
// // @method delete
// // @url /schemas/:id
// export const DeleteMetaModulesByIdHandler = asyncHandler( async (req, res, next) => {
//     const id = req.params.id;
//     const addStatus = await MetaModules.deleteOne({ _id: id});
//     res.status(200).json({success: true, message: `Successfully deleted ${id}`})
// });
