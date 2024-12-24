import baseService from "../services/base.service.js"
import sizeModel from "../models/size.model.js"
import controllerHandler from "../helpers/controller.helper.js"

const sizeController = {
    create: controllerHandler(baseService.createDocument, sizeModel, true, {
        checkDuplicate: ["name"]
    }),

    getAll: controllerHandler(baseService.getAllDocuments, sizeModel),

    updateById: controllerHandler(baseService.updateDocument, sizeModel, true, {
        checkDuplicate: ["name"]
    }),

    removeById: controllerHandler(baseService.removeDocument, sizeModel)
}

export default sizeController