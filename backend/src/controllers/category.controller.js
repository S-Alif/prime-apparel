import categoryModel from "../models/category.model.js"
import controllerHandler from "../helpers/controller.helper.js"
import categoryAndSizeService from "../services/categoryAndSize.service.js"

const categoryController = {
    create: controllerHandler(categoryAndSizeService.create, categoryModel),
    getAll: controllerHandler(categoryAndSizeService.getAll, categoryModel),
    updateById: controllerHandler(categoryAndSizeService.update, categoryModel),
    removeById: controllerHandler(categoryAndSizeService.remove, categoryModel)
}

export default categoryController