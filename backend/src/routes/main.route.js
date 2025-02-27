import express from 'express'
import adminRoutes from './admin.route.js'
import publicRoutes from './common.route.js'
import userRoutes from './user.route.js'
import { roles } from '../constants/constants.js'

// middleware
import authMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router()

// routes
router.use('/public', publicRoutes)
router.use('/admin', authMiddleware([roles.admin]), adminRoutes)
router.use('/user', authMiddleware([roles.user]), userRoutes)


export default router