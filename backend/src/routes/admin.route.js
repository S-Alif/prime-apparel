import express from 'express'
import dashboardRoutes from './admin-routes/dashboard.admin.route.js'
import productRoutes from './admin-routes/product.admin.route.js'
import categoryRoutes from './admin-routes/category.admin.route.js'
import colorRoutes from './admin-routes/colors.admin.route.js'
import sizeRoutes from './admin-routes/sizes.admin.route.js'
import orderRoutes from './admin-routes/order.admin.route.js'
import invoiceRoutes from './admin-routes/invoice.admin.route.js'
import paymentRoutes from './admin-routes/payment.admin.route.js'
import reviewsRoutes from './admin-routes/review.admin.route.js'


const router = express.Router()


// routes
router.use('/dashboard', dashboardRoutes)
router.use('/product', productRoutes)
router.use('/category', categoryRoutes)
router.use('/colors', colorRoutes)
router.use('/sizes', sizeRoutes)
router.use('/order', orderRoutes)
router.use('/invoice', invoiceRoutes)
router.use('/payment', paymentRoutes)
router.use('/reviews', reviewsRoutes)


export default router