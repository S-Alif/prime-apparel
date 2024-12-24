import { apiResponse } from "../helpers/apiResponse.helper.js"
import { apiError } from "../helpers/apiError.helper.js"

// for duplicate data checking
const duplicates = async (req, model, duplicates = []) => {
    const searchVector = duplicates.reduce((acc, key) => {
        if (req?.body[key] !== undefined) {
            acc[key] = req.body[key]
        }
        return acc
    }, {})

    let result = await model.countDocuments(searchVector)
    if(result > 0) return false
    return true
}

// base service
const baseService = {

    // create a document
    createDocument: async (req, model, returnData = false, options = {}) => {
        if (options?.checkDuplicate){
            const isValid = await duplicates(req, model, options.checkDuplicate)
            if (!isValid) throw new apiError(400, "Data already exists")
        }

        let result = await model.create(req.body)
        if (returnData) return new apiResponse(200, result)
        return new apiResponse(200, "Changes saved")
    },

    // update a document
    updateDocument: async (req, model, returnData = false, options = {}) => {
        console.log(returnData, options)
        if (options?.checkDuplicate) {
            const isValid = await duplicates(req, model, options.checkDuplicate)
            if (!isValid) throw new apiError(400, "Data already exists")
        }
        let id = req?.params?.id
        if (!id) throw new apiError(404, "Could not update data")

        let result = await model.findByIdAndUpdate({_id: id}, req.body, { new: true })
        if (returnData) return new apiResponse(200, result)
        return new apiResponse(200, "Data updated")
    },

    // remove a document
    removeDocument: async (req, model) => {
        let id = req?.params?.id
        if(!id) throw new apiError(404, "Could not remove data")
        let result = await model.findByIdAndDelete({_id: id})
        return new apiResponse(200, "Data removed")
    },

    // get all document
    getAllDocuments: async (req, model) => {
        let result = await model.find()
        return new apiResponse(200, result)
    },

    // get single document by id
    getSingleDocument: async (req, model) => {
        let result = await model.findById({ _id: req.params.id })
        return new apiResponse(200, result)
    }
}

export default baseService