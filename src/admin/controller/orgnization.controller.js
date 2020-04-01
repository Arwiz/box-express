// @desc  Add Organization Handler Function
// @Method  POST

import asyncHandler from "../../shared/middleware/asyncHandler";
import { Organization, Permission, Project, Team } from '../models'
import pluralize from 'pluralize';

export const CreateOrganizationHandler =  asyncHandler(async (req, res, next) => {
    res.send('Add Organization Handler Called');
    console.log("RL", req.url);
    res.send("HEllo");
    // let {firstName, lastName, email, roles, password} = req.body;
    // const user = {firstName, lastName, email, roles, password};
    // const addUserStat = await User.create(user);
    // res.status(201).json({success: true, data: addUserStat})
});

// @desc  Add User Handler Function
export const GetAllOrganizationsHandler = asyncHandler( async (req, res, next) => {
    try {
         const url = req.url ;
         console.log("RL", req.url);
         const urlArray = url.split('/');
        if(urlArray && urlArray.length > 0) {
            const obj = pluralize.singular(urlArray[1]);
            const results = await obj.find();
            return res.status(200).json({success: false, data: results})

        }else {
            res.status(200).json({success: false, message: "HEjjdsjf"})
        }

        // const results = await User.find();
        // res.status(200).json({success: true, data: results};
    } catch (e) {
        res.status(400).json({success: false, message: e.message})
    }
});


/*  Update/Delete with ID*/

// @desc  Get Single Organization Handler 
export const GetOrganizationHandler = (req, res, next) => {
    res.send('Get Organization Handler Called');
};

// @desc  Add Organization Handler Function
// @method Patch
export const UpdateOrganizationHandler = (req, res, next) => {
    res.send('Get Organization Handler Called');
};

// @desc  Add Organization Handler Function
// @method delete
export const DeleteOrganizationHandler = (req, res, next) => {
    res.send('Delete Organization Handler Called');
};