import sizeModel from "../models/size.model.js"
import controllerHandler from "../helpers/controller.helper.js"
import categoryAndSizeService from "../services/categoryAndSize.service.js"
import sizeService from "../services/size.service.js"

const sizeController = {
    create: controllerHandler(sizeService.create),
    getAll: controllerHandler(sizeService.getAll),
    updateById: controllerHandler(sizeService.update),
    removeById: controllerHandler(sizeService.remove)
}

export default sizeController