import productModel from '../models/product.model.js'
import productVariationModel from '../models/productVariations.model.js'
import productImageModel from '../models/productImages.model.js'
import {apiError} from '../helpers/apiError.helper.js'
import {apiResponse} from '../helpers/apiResponse.helper.js'


export const productService = {
    create: async (req) => {

    },
    update: async (req) => {

    },
    remove: async (req) => {

    },
    getAllProduct: async (req) => {

    },
    getProductById: async (req) => {

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