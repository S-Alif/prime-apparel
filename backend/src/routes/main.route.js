import express from 'express'
import adminRoutes from './admin.route.js'
import publicRoutes from './common.route.js'

const router = express.Router()

// middleware

// routes
router.use('/public', publicRoutes)
router.use('/admin', adminRoutes)


export default router