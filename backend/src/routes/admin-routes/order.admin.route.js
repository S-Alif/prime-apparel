import express from 'express'
const router = express.Router()

router
    .get('/')
    .get('/:id')
    .patch('/:id')
    .delete('/:id')

export default router