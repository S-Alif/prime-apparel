import express from 'express'
const router = express.Router()

router
    .get('/')
    .get('/:id')
    .patch('/:id')
    .delete('/:id')
    .get('/config')
    .patch('/config')

export default router