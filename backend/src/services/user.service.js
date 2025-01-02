import userModel from '../models/user.model.js'
import { apiError } from '../helpers/apiError.helper.js'
import { apiResponse } from '../helpers/apiResponse.helper.js'
import { roles } from '../constants/constants.js'


const userService = {
    getProfile: async (req) => {
        let id = req.headers?.id
        if (!id) throw new apiError(403, "Please login")

        let result = await userModel.findOne({_id: id}).select("-pass")

        if (!result) throw apiError(401, "User not found")
        return new apiResponse(200, result)
    },

    updateProfile: async (req) => {
        let id = req.headers?.id
        let data = req?.body
        if (!id) throw new apiError(403, "Please login")
        if(!data) throw new apiError(401, "Nothing to update")
        
        let result = await userModel.findOneAndUpdate({_id: id}, data, {new: true})
        return new apiResponse(200, result)
    },

    // get user by email or phone
    getUserByEmailOrPhone: async (req) => {
        let credential = req.params?.creds
        if(!credential) throw new apiError(401, "Please provide credentials")

        let result = await userModel.findOne({
            $or: [
                {email: credential},
                {phone: credential}
            ]
        }).select("-pass")

        if(!result) throw new apiError(401, "User not found")
        return new apiResponse(200, result)
    },

    // get all the users
    getAllUsers: async (req) => {
        const page = req.params?.page
        const limit = req.params?.limit
        const skip = (page - 1) * limit

        let result = await userModel.find()
                    .select("-pass")
                    .sort({createdAt: -1})
                    .skip(skip)
                    .limit(limit)

        return new apiResponse(200, result)
    },

    // block / unblock a user
    updateUserStatus: async (req) => {
        const id = req.params?.id
        const role = req.headers?.role
        const data = req.body
        if(!id) throw new apiError(400, "Please provide credentials")
        if(role != roles.admin) throw new apiError(403, "Need admin access")
            
        let result = await userModel.findByIdAndUpdate({_id: id}, data)
        return new apiResponse(200, "Status updated")
    }
}

export default userService