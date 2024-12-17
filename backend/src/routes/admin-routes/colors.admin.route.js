import express from 'express'
const router = express.Router()

router
    .get('/')
    .post('/')
    .patch('/:id')
    .delete('/:id')

export default router