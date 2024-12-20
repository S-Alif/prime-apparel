import controllerHandler from '../helpers/controller.helper.js'
import authService from '../services/auth.service.js'


const authController = {
    signup: controllerHandler(authService.signup),
    login: controllerHandler(authService.login),
    findAccountForgetPass: controllerHandler(authService.findAccountForgetPass),
    sendOtp: controllerHandler(authService.sendOtp),
    verifyOtp: controllerHandler(authService.verifyOtp),
    updatePass: controllerHandler(authService.updatePass),
}

export default authController