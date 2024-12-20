import express from 'express'
const router = express.Router()


// Define the routes
router
    .post('/login')
    .post('/signup')
    .get('/find-account')
    .post('/send-otp')
    .patch('/update-pass')
    .patch('/verify')

export default router