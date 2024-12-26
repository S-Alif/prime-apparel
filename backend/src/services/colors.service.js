import colorModel from "../models/color.model.js"
import {apiError} from "../helpers/apiError.helper.js"
import {apiResponse} from "../helpers/apiResponse.helper.js"
import validator, { isValidData } from "../schemas/dataValidator.schema.js"

const colorService = {
    create: async (req) => {
        const data = req?.body
        let validate = isValidData(validator.colorData, data)
        if(!validate) throw new apiError(400, "Please enter all the data")

        let checkColorName = await colorModel.countDocuments({
            $or: [
                { name: data.name },
                { colorValue: data.colorValue}
            ]
        })
        if(checkColorName > 0) throw new apiError(400, "Color name or value already exists")

        let result = await colorModel.create(data)
        return new apiResponse(200, result)
    },

    update: async (req) => {
        const id = req?.params?.id
        if(!id) throw new apiError(400, "Cannot update color")

        const data = req?.body
        let validate = isValidData(validator.colorData, data)
        if(!validate) throw new apiError(400, "Please enter all the data")

        let checkColorName = await colorModel.countDocuments(data)
        if (checkColorName > 0) throw new apiError(400, "Color name or value already exists")

        let result = await colorModel.findByIdAndUpdate({ _id: id}, data, {new: true })
        return new apiResponse(200, result)

    },

    remove: async (req) => {
        const id = req?.params?.id
        if(!id) throw new apiError(400, "Cannot delete color")
        
        let result = await colorModel.findByIdAndDelete({ _id: id })
        return new apiResponse(200, "Color deleted")
    },

    getAll: async () => {
        let colors = await colorModel.find()
        return new apiResponse(200, colors)
    }
 
}

export default colorService