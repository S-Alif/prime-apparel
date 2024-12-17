import express from 'express'
const router = express.Router()

router
    .get('/stats')
    .get('/products')
    .get('/users')
    .get('/orders')

export default router