import express from 'express'
import adminRoutes from './admin.route.js'
import publicRoutes from './common.route.js'
import { roles } from '../constants/constants.js'

// middleware
import authMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router()

// routes
router.use('/public', publicRoutes)
router.use('/admin', authMiddleware([roles.admin]), adminRoutes)


export default router