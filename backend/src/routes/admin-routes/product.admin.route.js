import express from 'express'
import fileUpload from 'express-fileupload'
import productController from '../../controllers/product.controller.js'
import { fileExtensions } from '../../constants/constants.js'

// file check middleware
import fileCheckMiddleware from '../../middlewares/fileChecker.middleware.js'


const router = express.Router()

router
    .get('/', productController.getAll)
    .get('/:id', productController.getById)
    .post('/', productController.create)
    .patch('/:id', productController.update)
    .delete('/:id', productController.remove)
    .post('/image/:id', fileUpload({ createParentPath: true }), fileCheckMiddleware([fileExtensions.jpg, fileExtensions.png]), productController.addImage) // product image
    .get('/image/:productId', productController.getImages)
    .delete('/image/:imgId/:productId', productController.removeImageById)
    .post('/variation', productController.addVariation) // product variantion
    .get('/variation/:productId', productController.getVariations)
    .patch('/variation/:varId/:productId', productController.updateVariationById)
    .delete('/variation/:varId/:productId', productController.removeVariationById)

export default router