import baseService from "../services/base.service.js"
import categoryModel from "../models/category.model.js"
import controllerHandler from "../helpers/controller.helper.js"

const categoryController = {
    create: controllerHandler(baseService.createDocument, categoryModel, true, {
        checkDuplicate: ["name"]
    }),

    getAll: controllerHandler(baseService.getAllDocuments, categoryModel),

    updateById: controllerHandler(baseService.updateDocument, categoryModel, true, {
        checkDuplicate: ["name"]
    }),

    removeById: controllerHandler(baseService.removeDocument, categoryModel)
}

export default categoryController