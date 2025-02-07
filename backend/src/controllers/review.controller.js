import reviewService from "../services/review.service.js"
import controllerHandler from "../helpers/controller.helper.js"


const reviewController = {
    postReview: controllerHandler(reviewService.postReview),
    removeReview: controllerHandler(reviewService.removeReview),
    getReviews: controllerHandler(reviewService.getReviews),
}

export default reviewController