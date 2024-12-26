import sizeModel from "../models/size.model.js"
import controllerHandler from "../helpers/controller.helper.js"
import categoryAndSizeService from "../services/categoryAndSize.service.js"

const sizeController = {
    create: controllerHandler(categoryAndSizeService.create, sizeModel),
    getAll: controllerHandler(categoryAndSizeService.getAll, sizeModel),
    updateById: controllerHandler(categoryAndSizeService.update, sizeModel),
    removeById: controllerHandler(categoryAndSizeService.remove, sizeModel)
}

export default sizeController