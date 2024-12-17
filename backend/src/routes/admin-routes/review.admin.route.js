import express from 'express'
const router = express.Router()

router
    .get('/')
    .delete('/:id')

export default router