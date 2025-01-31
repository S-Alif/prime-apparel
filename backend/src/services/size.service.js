import { apiError } from '../helpers/apiError.helper.js'
import { apiResponse } from '../helpers/apiResponse.helper.js'
import sizeModel from '../models/size.model.js'
import productVariationModel from '../models/productVariations.model.js'

const sizeService = {
    create: async (req) => {
        const data = req?.body
        
        if(data?.name == "" || data?.name.length < 1) throw new apiError(400, "Invalid size name")
    
        let check = await sizeModel.countDocuments(data)
        if (check > 0) throw new apiError(400, "Size already exists")

        let result = await sizeModel.create(data)
        return new apiResponse(200, result)
    },

    update: async (req) => {
        const id = req?.params?.id
        if (!id) throw new apiError(400, "Cannot update size")

        const data = req?.body
        let validate = isValidData(validator.categoryAndSize, data)
        if (!validate) throw new apiError(400, "Please enter all the data")

        let check = await sizeModel.countDocuments(data)
        if (check > 0) throw new apiError(400, "Size already exists")

        let result = await sizeModel.findByIdAndUpdate({ _id: id }, data, { new: true })
        return new apiResponse(200, result)

    },

    remove: async (req) => {
        const id = req?.params?.id
        if (!id) throw new apiError(400, "Cannot delete size")

        let countSizeUse = await productVariationModel.countDocuments({ size: id})
        if(countSizeUse > 0) throw new apiError(400, "Cannot delete size, it is being used in products")

        let result = await sizeModel.findByIdAndDelete({ _id: id })
        return new apiResponse(200, "Size deleted")
    },

    getAll: async (req) => {
        let data = await sizeModel.find()
        return new apiResponse(200, data)
    }
}

export default sizeService