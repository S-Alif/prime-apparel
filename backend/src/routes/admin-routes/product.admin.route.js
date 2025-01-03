import express from 'express'
import productController from '../../controllers/product.controller.js'

const router = express.Router()

router
    .get('/', productController.getAll)
    .get('/:id', productController.getById)
    .post('/', productController.create)
    .patch('/:id', productController.update)
    .delete('/:id', productController.remove)

export default router