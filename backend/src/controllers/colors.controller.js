import controllerHandler from "../helpers/controller.helper.js"
import colorService from "../services/colors.service.js"

const colorController = {
    create: controllerHandler(colorService.create),
    getAll: controllerHandler(colorService.getAll),
    updateById: controllerHandler(colorService.update),
    removeById: controllerHandler(colorService.remove)
}

export default colorController