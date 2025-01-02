import userService from '../services/user.service.js'
import controllerHandler from '../helpers/controller.helper.js'

const userController = {
    getProfile: controllerHandler(userService.getProfile),
    updateProfile: controllerHandler(userService.updateProfile),
    getUserByEmailOrPhone: controllerHandler(userService.getUserByEmailOrPhone),
    getAllUsers: controllerHandler(userService.getAllUsers),
    updateUserStatus: controllerHandler(userService.updateUserStatus),
}

export default userController