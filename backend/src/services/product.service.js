import productModel from '../models/product.model.js'
import productVariationModel from '../models/productVariations.model.js'
import productImageModel from '../models/productImages.model.js'
import {apiError} from '../helpers/apiError.helper.js'
import {apiResponse} from '../helpers/apiResponse.helper.js'
import validator, {isValidData} from '../schemas/dataValidator.schema.js'
import { roles } from '../constants/constants.js'
import mongoose from 'mongoose'


export const productService = {

    // add a product
    create: async (req) => {
        let data = req?.body
        if(!data) throw new apiError(400, "Provide product data")
        
        let validate = isValidData(validator.productAddSchema, data)
        if(!validate) throw new apiError(401, "Invalid product data")

        let result = await productModel.create(data)
        return new apiResponse(200, result)        
    },

    // update a product
    update: async (req) => {
        let data = req?.body
        let id = req?.params?.id
        if (!data) throw new apiError(400, "Provide product data")

        let result = await productModel.findByIdAndUpdate({_id: id}, data, {new: true})

        return new apiResponse(200, result)
    },

    // remove a product
    remove: async (req) => {

    },

    // get all products
    getAllProduct: async (req) => {
        const role = req.headers?.role
        
        const page = parseInt(req.query?.page)
        const limit = parseInt(req.query?.limit)
        const skip = (page - 1) * limit
        const category = req.query?.category

        const matchStage = category && category !== "all"
            ? { category: new mongoose.Types.ObjectId(category), ...(!role || role == roles.user ? {published: true} : {}) }
            : { ...(!role || role == roles.user ? { published: true } : {}) }

        const pipeline = [
            { $match: matchStage },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "categories"
                }
            },
            {
                $lookup: {
                    from: "productImage",
                    localField: "_id",
                    foreignField: "productId",
                    as: "images"
                }
            },
            { $unwind: { path: "$categories", preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    name: 1,
                    detail: 1,
                    price: 1,
                    category: "$categories.name",
                    images: "$images.url",
                    discount: 1,
                    totalRatings: 1,
                    reviewCount: 1,
                    currentRating: 1,
                    ...(role && role == roles.admin && {
                        published: 1,
                        featured: 1
                    }),
                    createdAt: 1
                }
            }
        ]

        let result = await productModel.aggregate(pipeline)        
        return new apiResponse(200, result)
    },

    // get a product by id
    getProductById: async (req) => {
        const id = req?.params?.id
        if (!id) throw new apiError(400, "No product Id")

        const pipeline = [
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "categories"
                }
            },
            { $unwind: { path: "$categories", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "productImage",
                    localField: "_id",
                    foreignField: "productId",
                    as: "images"
                }
            },
            {
                $lookup: {
                    from: "productVariation",
                    localField: "_id",
                    foreignField: "productId",
                    as: "variations"
                }
            },
            {
                $lookup: {
                    from: "sizes",
                    localField: "variations.size",
                    foreignField: "_id",
                    as: "variationSizes"
                }
            },
            {
                $lookup: {
                    from: "colors",
                    localField: "variations.color",
                    foreignField: "_id",
                    as: "variationColors"
                }
            },
            {
                $project: {
                    name: 1,
                    detail: 1,
                    price: 1,
                    category: "$categories.name",
                    images: "$images.url",
                    variations: {
                        $map: {
                            input: "$variations",
                            as: "variation",
                            in: {
                                _id: "$$variation._id",
                                size: {
                                    $arrayElemAt: [
                                        "$variationSizes",
                                        { $indexOfArray: ["$variations.size", "$$variation.size"] }
                                    ]
                                },
                                color: {
                                    $arrayElemAt: [
                                        "$variationColors",
                                        { $indexOfArray: ["$variations.color", "$$variation.color"] }
                                    ]
                                },
                                stock: "$$variation.stock"
                            }
                        }
                    },
                    createdAt: 1
                }
            }
        ]

        let result = await productModel.aggregate(pipeline)        
        return new apiResponse(200, result)
    }
}

// product variation
export const productVariation = {
    create: async (req) => {

    },
    update: async (req) => {
 
    },
    remove: async (req) => {

    },
    getVariationsByProduct: async (req) => {

    }
}

// product image
export const productImage = {
    uploadImage: async (req) => {

    },
    remove: async (req) => {

    },
    getImagesByProduct: async (req) => {

    }
}