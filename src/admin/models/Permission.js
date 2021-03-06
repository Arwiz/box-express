import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PermissionSchema = new Schema({
    permissionName:  {
        type: String,
        required:[true,' Please add permission name'],
        maxLength:[100, 'Name can not Exceed more then 100 Characters'],
        trim: true,
        unique: true,
    },
    permissionId:  {
        type: String,
        required:[true,' Please add permission Id'],
        maxLength:[50, 'Id can not Exceed more then 50 Characters'],
        trim: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

export default mongoose.model('Permission', PermissionSchema);