import express from 'express'
import authController from '../controllers/auth.controller.js'
const router = express.Router()


// Define the routes
router
    .post('/login', authController.login)
    .post('/signup', authController.signup)
    .get('/find-account', authController.findAccountForgetPass)
    .post('/send-otp', authController.sendOtp)
    .patch('/verify', authController.verifyOtp)
    .patch('/update-pass', authController.updatePass)

export default router