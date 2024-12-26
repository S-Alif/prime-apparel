import sizeModel from "../models/size.model.js"
import controllerHandler from "../helpers/controller.helper.js"

const sizeController = {
    create: controllerHandler(),
    getAll: controllerHandler(),
    updateById: controllerHandler(),
    removeById: controllerHandler()
}

export default sizeController