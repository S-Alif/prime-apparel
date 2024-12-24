import express from 'express'
import categoryController from '../../controllers/category.controller.js'

const router = express.Router()

router
    .get('/', categoryController.getAll)
    .post('/', categoryController.create)
    .patch('/:id', categoryController.updateById)
    .delete('/:id', categoryController.removeById)

export default router