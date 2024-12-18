import { apiResponse } from "../helpers/apiResponse.helper.js"

const baseService = {
    createDocument: async (req, model, returnData = false) => {
        let result = await model.create(req.body)
        if(returnData) returnData(200, result)
        return new apiResponse(200, "Changes saved")
    },

    updateDocument: async (req, model, returnData = false) => {
        let result = await model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if(returnData) returnData(200, result)
        return new apiResponse(200, "Data updated")
    },

    removeDocument: async (req, model) => {
        let result = await model.findByIdAndDelete(req.params.id)
        return new apiResponse(200, "Data removed")
    },

    getAllDocuments: async (req, model) => {
        let result = await model.find()
        return new apiResponse(200, result)
    },

    getSingleDocument: async (req, model) => {
        let result = await model.findById({ _id: req.params.id })
        return new apiResponse(200, result)
    }
}

export default baseService