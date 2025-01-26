import express from 'express'
import authController from '../controllers/auth.controller.js'
import categoryController from '../controllers/category.controller.js'
import colorController from '../controllers/colors.controller.js'
import sizeController from '../controllers/size.controller.js'
import productController from '../controllers/product.controller.js'

const router = express.Router()


const routeList = [
    {
        path: '/login',
        method: 'post',
        controller: authController.login
    },
    {
        path: '/signup',
        method: 'post',
        controller: authController.signup
    },
    {
        path: '/find-account',
        method: 'get',
        controller: authController.findAccountForgetPass
    },
    {
        path: '/send-otp',
        method: 'post',
        controller: authController.sendOtp
    },
    {
        path: '/verify',
        method: 'patch',
        controller: authController.verifyOtp
    },
    {
        path: '/update-pass',
        method: 'patch',
        controller: authController.updatePass
    },
    {
        path: '/category',
        method: 'get',
        controller: categoryController.getAll
    },
    {
        path: '/colors',
        method: 'get',
        controller: colorController.getAll
    },
    {
        path: '/sizes',
        method: 'get',
        controller: sizeController.getAll
    },
    {
        path: '/products',
        method: 'get',
        controller: productController.getAll
    },
    {
        path: '/products/:id',
        method: 'get',
        controller: productController.getById
    },
    {
        path: '/products/variation/:productId',
        method: 'get',
        controller: productController.getVariations
    },
    {
        path: '/products/images/:productId',
        method: 'get',
        controller: productController.getImages
    }
]

// Define the routes
routeList.forEach(({ path, method, controller }) => {
    router[method](path, controller)
})


export default router