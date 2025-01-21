import userModel from '../models/user.model.js'
import otpModel from '../models/otp.model.js'
import { apiResponse } from '../helpers/apiResponse.helper.js'
import { apiError } from '../helpers/apiError.helper.js'
import validator, { isValidData } from '../schemas/dataValidator.schema.js' 
import mailHelper from '../helpers/mail.helper.js'
import { otpMail, passwordChanged } from '../utils/mailText.util.js'


const authService = {

    // signup
    signup: async (req) => {
        const validateUserData = isValidData(validator.signup, req?.body)
        if(!validateUserData) throw new apiError(401, "Please fill all the data properly")

        let checkUserEmail = await userModel.countDocuments({ email: req?.body?.email })
        if(checkUserEmail > 0) throw new apiError(401, "Email already exists")
        
        let newUser = await userModel.create(req?.body)
        
        return new apiResponse(200, "Account created successfully")
    },

    // login
    login: async (req) => {
        const validateLoginData = isValidData(validator.login, req?.body)
        if (!validateLoginData) throw new apiError(401, "Please fill all the data properly")

        let user = await userModel.findOne({ email: req?.body?.email }).select("pass -_id")
        if(!user) throw new apiError(400, "Account does not exist")

        let userData = await userModel.findOne({email: req?.body?.email, verified: true}).select("-pass")
        if (!userData) throw new apiError(401, "Account is not verified")
        
        const checkPass = await user.verifyPassword(req.body.pass)
        if (!checkPass) throw new apiError(401, "Invalid password")

        let token = await userData.generateToken()
        userData._doc.token = token

        return new apiResponse(200, userData)
    },

    // forget password find account
    findAccountForgetPass: async (req) => {
        let email = req?.query?.email
        if(!email) throw new apiError(400, "No email provided")
        
        let user = await userModel.findOne({ email: email }).select("fName lName -_id")

        if(!user) throw new apiError(400, "Account does not exist")
        return new apiResponse(200, user)
    },

    // send otp
    sendOtp: async (req) => {
        let email = req?.body?.email
        if(!email) throw new apiError(400, "No email provided")
        
        const user = await userModel.findOne({ email: email })
        if (!user) throw new apiError(400, "Account does not exist")

        let otpCode = Math.floor(100000 + Math.random() * 900000)
        const createOtp = await otpModel.create({email, otpCode})

        let sendMail = await mailHelper(email, "Account verification", otpMail(user?._doc?.fName, user?._doc?.lName, otpCode))
        
        return new apiResponse(200, "OTP sent successfully")
    },

    verifyOtp: async (req) => {
        const validateData = isValidData(validator.verifyOtp, req?.body)
        if (!validateData) throw new apiError(401, "Please fill all the data properly")            
        
        const checkOtp = await otpModel.findOne({ email: req.body.email, otpCode: req.body.otpCode})
        if(checkOtp == null || !checkOtp) throw new apiError(401, "Otp expired")

        await otpModel.updateOne({ email: req.body.email, otpCode: req.body.otpCode, verified: false }, {verified: true})

        if(req.body?.type && req.body.type == 10){
            await userModel.updateOne({ email: req.body.email}, {verified: true})
        }

        return new apiResponse(200, "Otp verified successfully")
    },

    updatePass: async (req) => {
        let id = req?.headers?.id

        if (!req?.body?.newPass || !req?.body?.confirmPass || (req?.body?.newPass !== req?.body?.confirmPass)) throw new apiError(401, "New password and confirm passwords do not match")

        // for updating password from user dashboard
        if(id && req?.body?.oldPass){
            let user = await userModel.findOne({_id: id}).select("pass")
            const checkOldPass = user.verifyPassword(req.body.oldPass)
            if(!checkOldPass) throw new apiError(401, "Invalid old password")
        }
        else{
            // for updating password from forget password
            if (!req?.body?.email) throw new apiError(401, "No email provided")
            let user = await userModel.findOne({ email: req?.body?.email }).select("pass")
            if (!user) throw new apiError(401, "Account does not exist")
        }

        let updateVector = id ? { _id: id } : {email: req?.body?.email}

        let userData = await userModel.findOne(updateVector)
        userData.pass = req?.body?.newPass
        await userData.save()

        await mailHelper(id ? req?.headers?.email : req?.body?.email, "Password changed", passwordChanged(userData?._doc?.fName, userData?._doc?.lName, req?.body?.date))

        return new apiResponse(200, "Password updated successfully")
    }
}

export default authService