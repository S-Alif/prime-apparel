import {apiError} from '../helpers/apiError.helper.js'
import { apiResponse } from '../helpers/apiResponse.helper.js'
import categoryModel from '../models/category.model.js'
import productModel from '../models/product.model.js'
import { uploadProductImage } from '../utils/fileHandler.util.js'

const categoryService = {
    create: async (req) => {
        const data = req?.body
        if(data?.name == "" || data?.name.length < 3) throw new apiError(400, "Invalid category name")

        let check = await categoryModel.countDocuments({name: data.name})
        if (check > 0) throw new apiError(400, "Category already exists")

        const categoryImage = Object.keys(req.files).flatMap(file => {
            return Array.isArray(req.files[file]) ? req.files[file] : [req.files[file]]
        })
        const uploadImage = await uploadProductImage(categoryImage)

        let result = await categoryModel.create({
            name: data.name,
            image: uploadImage[0].url
        })
        return new apiResponse(200, result)
    },

    update: async (req) => {
        const id = req?.params?.id
        if (!id) throw new apiError(400, "Cannot update data")

        const data = req?.body
        if(data?.name == "" || data?.name.length < 2) throw new apiError(400, "Please enter all the data")

        let check = await categoryModel.countDocuments({name: data?.name})
        if (check > 1) throw new apiError(400, "Category already exists")

        if(req?.files){
            const categoryImage = Object.keys(req.files).flatMap(file => {
                return Array.isArray(req.files[file])? req.files[file] : [req.files[file]]
            })
            const uploadImage = await uploadProductImage(categoryImage)
            data.image = uploadImage[0].url
        }        

        let result = await categoryModel.findByIdAndUpdate({ _id: id }, data, { new: true })
        return new apiResponse(200, result)
    },

    remove: async (req) => {
        const id = req?.params?.id
        if (!id) throw new apiError(400, "Cannot delete data")

        const check = await productModel.countDocuments({category: id})
        if(check > 0) throw new apiError(400, "Cannot delete category, it is being used in products")

        let result = await categoryModel.findByIdAndDelete({ _id: id })
        return new apiResponse(200, "Data deleted")
    },

    getAll: async (req) => {
        let data = await categoryModel.find()
        return new apiResponse(200, data)
    }
}

export default categoryService