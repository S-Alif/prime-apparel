import mongoose from 'mongoose'
import productModel from '../models/product.model.js'
import productVariationModel from '../models/productVariations.model.js'
import productImageModel from '../models/productImages.model.js'
import {apiError} from '../helpers/apiError.helper.js'
import {apiResponse} from '../helpers/apiResponse.helper.js'
import validator, {isValidData} from '../schemas/dataValidator.schema.js'
import { roles } from '../constants/constants.js'
import { uploadProductImage } from '../utils/fileHandler.util.js'


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
                    from: "productimages",
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
                    category: {
                        _id: "$categories._id",
                        name: "$categories.name"
                    },
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
                    from: "productimages",
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
                    category: {
                        _id: "$categories._id",
                        name: "$categories.name"
                    },
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

    // create variation
    create: async (req) => {
        const data = req?.body
        if(!data) throw new apiError(400, "Provide product variation data")
        
        let validate = isValidData(validator.productVariation, data)
        if(!validate) throw new apiError(401, "Invalid product variation data")

        let dataCopy = {...data}
        delete dataCopy['stock']
        let checkForDuplication = await productVariationModel.countDocuments(dataCopy)

        if (checkForDuplication > 0) throw new apiError(400, "Variation already exists")

        let result = await productVariationModel.create(data)
        return new apiResponse(200, result)
    },

    // update a variation
    update: async (req) => {
        let data = req?.body
        if (!data) throw new apiError(400, "Provide product variation data")

        const variationId = req.params?.varId
        const productId = req.params?.productId

        if(!variationId || !productId) throw new apiError(400, "Provide product variation information")

        let checkForDuplication = await productVariationModel.countDocuments({ productId: productId, size: data?.size, color: data?.color })

        if(checkForDuplication > 1) throw new apiError(400, "Variation already exists")

        let result = await productVariationModel.findByIdAndUpdate({_id: variationId, productId: productId}, data, {new: true})

        return new apiResponse(200, result)
    },

    // remove a variation
    remove: async (req) => {
        const variationId = req.params?.varId
        const productId = req.params?.productId
        if(!variationId || !productId) throw new apiError(400, "Provide product variation information")

        let result = await productVariationModel.findByIdAndDelete({_id: variationId, productId: productId})
        return new apiResponse(200, result)
    },

    // get variations by product
    getVariationsByProduct: async (req) => {
        const role = req.headers?.role
        const productId = req.params?.productId
        if(!productId) throw new apiError(400, "Invalid product information")
        
        let result = await productVariationModel.find({productId: productId})
                    .select((role && role == roles.admin) ? "" : "-_id -createdAt -updatedAt")
                    .populate({
                        path: 'color',
                        select: 'name colorValue'
                    })
                    .populate({
                        path:'size',
                        select: 'name'
                    })
        return new apiResponse(200, result)
    }
}

// product image
export const productImage = {

    // upload product image
    uploadImage: async (req) => {
        const productId = req.params?.id
        if(!productId) throw new apiError(400, "Invalid product information")
        
        const imageCount = await productImageModel.countDocuments({_id: productId})
        if(imageCount >= 5) throw new apiError(400, "Maximum image limit reached")

        // new images uploading counts
        const uploadingImageArray = Object.keys(req.files).flatMap(file => {
            return Array.isArray(req.files[file]) ? req.files[file] : [req.files[file]]
        })
        
        if(imageCount + uploadingImageArray.length >= 5) throw new apiError(400, "Maximum image limit reached")

        // upload to imgbb
        let uploadImageResult = await uploadProductImage(uploadingImageArray)
        
        // upload product image in database
        let uploadImage = uploadImageResult.map(async (imgUrlObj) => {
            return await productImageModel.create({
                productId,
                ...imgUrlObj
            })
        })
        let result = await Promise.all(uploadImage)
        
        return new apiResponse(200, result)
        
    },

    // remove product images
    remove: async (req) => {
        const imgId = req.params?.imgId
        const productId = req.params?.productId
        if (!imgId || !productId) throw new apiError(400, "Invalid image information")
        
        let result = await productImageModel.findByIdAndDelete({_id: imgId, productId: productId})
        return new apiResponse(200, "Image removed successfully")
    },

    // get images by product
    getImagesByProduct: async (req) => {
        const productId = req.params?.id
        const role = req.headers?.role
        if(!productId) throw new apiError(400, "Invalid product information")
        
        let result = await productImageModel.find({ productId: productId}).select((role && role == roles.admin) ? "" : "url -_id")

        return new apiResponse(200, result)
    }
}