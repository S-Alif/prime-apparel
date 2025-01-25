import express from 'express'
import orderController from '../../controllers/order.controller.js'
const router = express.Router()

router
    .get('/', orderController.getAllOrder)
    .get('/:id', orderController.getOrderById)
    .get('/user/:userId', orderController.getOrderByUser)
    .patch('/:userId/:id', orderController.update)
    .delete('/:userId/:id', orderController.remove)

export default router