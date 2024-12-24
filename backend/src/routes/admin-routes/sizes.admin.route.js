import express from 'express'
import sizeController from '../../controllers/size.controller.js'
const router = express.Router()

router
    .get('/', sizeController.getAll)
    .post('/', sizeController.create)
    .patch('/:id', sizeController.updateById)
    .delete('/:id', sizeController.removeById)

export default router