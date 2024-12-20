import asyncHandler from '../helpers/asyncHandler.js'
import controllerHandler from '../helpers/controller.helper.js'
import authService from '../services/auth.service.js'


const authController = {
    signup: controllerHandler(authService.signup),
    login: asyncHandler(async (req, res) => {
        let result = await authService.login(req)
        let token = result.data?._doc.token
        delete result.data._doc.token
        
        res.status(200).cookie(
            "token",
            token,
            {
                httpOnly: true,
                sameSite: "none",
                secure: true
            }
        ).json(result)
    }),
    findAccountForgetPass: controllerHandler(authService.findAccountForgetPass),
    sendOtp: controllerHandler(authService.sendOtp),
    verifyOtp: controllerHandler(authService.verifyOtp),
    updatePass: controllerHandler(authService.updatePass),
}

export default authController