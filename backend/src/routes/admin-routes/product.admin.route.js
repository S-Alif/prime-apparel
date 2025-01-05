import express from 'express'
import fileUpload from 'express-fileupload'
import productController from '../../controllers/product.controller.js'

// file check middleware
import fileCheckMiddleware from '../../middlewares/fileChecker.middleware.js'
import { fileExtensions } from '../../constants/constants.js'


const router = express.Router()

router
    .get('/', productController.getAll)
    .get('/:id', productController.getById)
    .post('/', productController.create)
    .patch('/:id', productController.update)
    .delete('/:id', productController.remove)
    .post('/image/:id', fileUpload({ createParentPath: true }), fileCheckMiddleware([fileExtensions.jpg, fileExtensions.png]), productController.addImage) // product image
    .get('/image/:id', productController.getImages)
    .delete('/image/:imgId/:productId', productController.removeImageById)

export default router