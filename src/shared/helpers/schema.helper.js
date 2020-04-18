import mongoose from 'mongoose';
import {dataTypes} from "../models/data";
const Schema = mongoose.Schema;

function schemaDesignFromMetaModule(metamodule) {

    console.log(metamodule);
    const collectionName = metamodule.moduleName;
    console.log(collectionName);
    const schema = {};
    schema['clientId'] = {
        type: Schema.Types.ObjectId,
        required: true
    };
    schema['projectId'] = {
        type: Schema.Types.ObjectId,
        required: true
    };
    schema['moduleId'] = {
        type: Schema.Types.ObjectId,
        required: true
    }
    metamodule.fields.forEach(field => {
        console.log(JSON.stringify(generateField(field)));
        schema[field.fieldId] = generateField(field);
    });
    return new Schema(schema);
    // return new Schema(schema,{
    //     toObject: {
    //         transform: function (doc, ret) {
    //             delete ret._id;
    //         }
    //     },
    //     toJSON: {
    //         transform: function (doc, ret) {
    //             delete ret._id;
    //         }
    //     }
    // });
}

function generateField(field) {
    let obj = {};
    obj = {...obj,  ...getSchemaType(field.fieldType)};
    obj['required'] = field.required ? field.required :  undefined;
    return obj;
}

function  getSchemaType(schemaType) {
    switch (schemaType) {
        case dataTypes.TEXT:
            return { type: String};
            break
        case dataTypes.BOOLEAN:
            return  { type: Boolean}
            break
        case dataTypes.DATE:
            return { type: Date};
            break
        case dataTypes.INTEGER:
        case dataTypes.COST:
            return { type: Number};
            break
        case dataTypes.MULTI_SELECT:
        case dataTypes.SINGLE_SELECT:
            return  { type: Map};
            break
        default:
            return null;
            break;
    }
    return;
}


export default schemaDesignFromMetaModule;