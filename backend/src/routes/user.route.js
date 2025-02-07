import express from 'express'
import userController from '../controllers/user.controller.js'
import orderController from '../controllers/order.controller.js'
import reviewController from '../controllers/review.controller.js'

const router = express.Router()

const routeList = [
    {
        path: '/profile',
        method: 'get',
        controller: userController.getProfile
    },
    {
        path: '/profile',
        method: 'patch',
        controller: userController.updateProfile
    },
    {
        path: '/orders',
        method: 'post',
        controller: orderController.getOrderByUser
    },
    {
        path: '/orders/:orderId',
        method: 'get',
        controller: orderController.getOrderById
    },
    {
        path: '/invoice/:orderId',
        method: 'get',
        controller: orderController.getOrderById
    },
    {
        path: '/review',
        method: 'post',
        controller: reviewController.postReview
    },
]


export default router