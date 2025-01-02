import { productService, productVariation, productImage } from '../services/product.service.js'
import controllerHandler from '../helpers/controller.helper.js'


const productController = {
    create: controllerHandler(productService.create),
    update: controllerHandler(productService.update),
    remove: controllerHandler(productService.remove),
    getAll: controllerHandler(productService.getAllProduct),
    getById: controllerHandler(productService.getProductById),

    getVariations: controllerHandler(productVariation.getVariationsByProduct),
    addVariation: controllerHandler(productVariation.create),
    updateVariationById: controllerHandler(productVariation.update),
    removeVariationById: controllerHandler(productVariation.remove),

    getImages: controllerHandler(productImage.getImagesByProduct),
    addImage: controllerHandler(productImage.uploadImage),
    removeImageById: controllerHandler(productImage.remove)
}

export default productController