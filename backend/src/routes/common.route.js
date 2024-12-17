import express from 'express'
const router = express.Router()


// Define the routes
router.post('/login')
router.post('/signup')
router.get('/find-account')
router.post('/send-otp')
router.patch('/update-pass')
router.patch('/verify')

export default router