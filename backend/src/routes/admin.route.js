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
import userRoutes from './admin-routes/users.admin.route.js'


const router = express.Router()


// routes
const routes = [
    { path: '/users', route: userRoutes },
    { path: '/dashboard', route: dashboardRoutes },
    { path: '/product', route: productRoutes },
    { path: '/category', route: categoryRoutes },
    { path: '/colors', route: colorRoutes },
    { path: '/size', route: sizeRoutes },
    { path: '/order', route: orderRoutes },
    { path: '/invoice', route: invoiceRoutes },
    { path: '/payment', route: paymentRoutes },
    { path: '/reviews', route: reviewsRoutes },
]

routes.forEach(({ path, route }) => {
    router.use(path, route)
})


export default router