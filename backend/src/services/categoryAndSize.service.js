import {apiError} from '../helpers/apiError.helper.js'
import { apiResponse } from '../helpers/apiResponse.helper.js'
import validator, { isValidData } from '../schemas/dataValidator.schema.js'

const categoryAndSizeService = {
    create: async (req, model) => {
        const data = req?.body
        let validate = isValidData(validator.categoryAndSize, data)
        if (!validate) throw new apiError(400, "Please enter all the data")

        let check = await model.countDocuments(data)
        if (check > 0) throw new apiError(400, "Data already exists")

        let result = await model.create(data)
        return new apiResponse(200, result)
    },

    update: async (req, model) => {
        const id = req?.params?.id
        if (!id) throw new apiError(400, "Cannot update data")

        const data = req?.body
        let validate = isValidData(validator.colorData, data)
        if (!validate) throw new apiError(400, "Please enter all the data")

        let check = await model.countDocuments(data)
        if (check > 0) throw new apiError(400, "Data already exists")

        let result = await model.findByIdAndUpdate({ _id: id }, data, { new: true })
        return new apiResponse(200, result)

    },

    remove: async (req, model) => {
        const id = req?.params?.id
        if (!id) throw new apiError(400, "Cannot delete color")

        let result = await model.findByIdAndDelete({ _id: id })
        return new apiResponse(200, "Color deleted")
    },

    getAll: async (req, model) => {
        let data = await model.find()
        return new apiResponse(200, data)
    }
}

export default categoryAndSizeService