// @desc  Login Function
import User from "../models/User";
import asyncHandler from "../../shared/middleware/asyncHandler";
import encrypt from "../../shared/helpers/encryption.helper";
import ErrorResponse from "../../shared/utils/ErrorResponse";

export const loginHandler =  asyncHandler( async (req, res, next)=> {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }
    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }
    sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();
    user.password = undefined;
    res
        .status(statusCode)
        .cookie('token', token, { secure: true})
        .json({
            success: true,
            user,
            token
        });
};

