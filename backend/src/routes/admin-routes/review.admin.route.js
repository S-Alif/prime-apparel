import express from 'express'
import reviewController from '../../controllers/review.controller.js'
const router = express.Router()

router
    .get('/', reviewController.getReviews)
    .delete('/:productId', reviewController.removeReview)

export default router