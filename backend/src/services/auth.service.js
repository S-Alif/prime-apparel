import userModel from '../models/user.model.js'
import otpModel from '../models/otp.model.js'
import { apiResponse } from '../helpers/apiResponse.helper.js'
import { apiError } from '../helpers/apiError.helper.js'
import validator, { isValidData } from '../schemas/dataValidator.schema.js' 
import mailHelper from '../helpers/mail.helper.js'
import { otpMail } from '../utils/mailText.util.js'


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
        
        const checkPass = user.verifyPassword(req.body.pass)
        if (!checkPass) throw new apiError(401, "Invalid password")

        let userData = await userModel.findOne({ email: req?.body?.email }).select("-pass")
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
        
        let otpCode = Math.floor(100000 + Math.random() * 900000)
        const createOtp = await otpModel.create({email, otpCode})
        const user = await userModel.findOne({email: email})

        let sendMail = await mailHelper(email, "Account verification", otpMail(user?._doc?.fName, user?._doc?.lName, otpCode))
        
        return new apiResponse(200, "OTP sent successfully")
    },

    verifyOtp: async (req) => {

    },

    updatePass: async (req) => {

    }
}

export default authService