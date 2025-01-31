import express from 'express'
import categoryController from '../../controllers/category.controller.js'
import fileUpload from 'express-fileupload'
import fileChecker from '../../middlewares/fileChecker.middleware.js'
import { fileExtensions } from '../../constants/constants.js'

const router = express.Router()

router
    .get('/', categoryController.getAll)
    .post('/', fileUpload({ createParentPath: true }), fileChecker([fileExtensions.jpg, fileExtensions.png], 1), categoryController.create)
    .patch('/:id', fileUpload({ createParentPath: true }), fileChecker([fileExtensions.jpg, fileExtensions.png], 0), categoryController.updateById)
    .delete('/:id', categoryController.removeById)

export default router