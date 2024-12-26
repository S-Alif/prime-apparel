import categoryModel from "../models/category.model.js"
import controllerHandler from "../helpers/controller.helper.js"

const categoryController = {
    create: controllerHandler(),
    getAll: controllerHandler(),
    updateById: controllerHandler(),
    removeById: controllerHandler()
}

export default categoryController