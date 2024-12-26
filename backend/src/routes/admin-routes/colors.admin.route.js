import express from 'express'
import colorController from '../../controllers/colors.controller.js'
const router = express.Router()

router
    .get('/', colorController.getAll)
    .post('/', colorController.create)
    .patch('/:id', colorController.updateById)
    .delete('/:id', colorController.removeById)

export default router