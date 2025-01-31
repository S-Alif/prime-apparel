import controllerHandler from "../helpers/controller.helper.js"
import categoryAndSizeService from "../services/categoryAndSize.service.js"

const categoryController = {
    create: controllerHandler(categoryAndSizeService.create),
    getAll: controllerHandler(categoryAndSizeService.getAll),
    updateById: controllerHandler(categoryAndSizeService.update),
    removeById: controllerHandler(categoryAndSizeService.remove)
}

export default categoryController