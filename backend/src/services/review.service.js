import reviewModel from "../models/review.model.js"
import productModel from "../models/product.model.js"
import {apiError} from "../helpers/apiError.helper.js"
import {apiResponse} from "../helpers/apiResponse.helper.js"
import { roles } from "../constants/constants.js"
import validator, { isValidData } from "../schemas/dataValidator.schema.js"

const reviewService = {

    // create a review
    postReview: async (req) => {
        let userId = req.headers?.id
        if(!userId) throw new apiError(404, "User not found")
        
        let role = req.headers?.role
        if(!role || role != roles.user) throw new apiError(400, "Only users can post reviews")

        let data = req?.body
        let validate = isValidData(validator.reviewSchema, data)
        if(!validate) throw new apiError(400, "Invalid review data")

        let result = await reviewModel.create({user: userId, ...data})

        await productModel.findByIdAndUpdate(
            {_id: data?.product},
            {
                $inc: {
                    totalRating: data.rating,
                    reviewCount: 1
                }
            }
        )

        return new apiResponse(200, result)
    },

    // remove review
    removeReview: async (req) => {
        let role = req.headers?.role
        let userId = req.headers?.id

        if(role != roles.admin && !userId) throw new apiError(400, "Cannot remove review")

        let productId = req.params?.productId
        let review = await reviewModel.findOneAndDelete({ user: userId, product: productId }, { returnOriginal: true}).lean()
        if (!review) throw new apiError(404, "Review not found")

        await productModel.findByIdAndUpdate(
            { _id: review?.product },
            {
                $inc: {
                    totalRating: review.rating > 0 ? -review.rating : 0,
                    reviewCount: -1
                }
            }
        )

        return new apiResponse(200, "Review removed")
    },

    // get reviews
    getReviews: async (req) => {
        let role = req.headers?.role
        let productId = req.query?.product
        let page = isNaN(req.query?.page) ? 1 : parseInt(req.query?.page)
        let limit = isNaN(req.query?.limit) ? 20 : parseInt(req.query?.limit)
        let skip = (page - 1) * limit

        let sort = req.query?.sortByRating
        let sortStage = {createdAt: -1}
        if(sort && sort == "dsc") sortStage.rating = -1
        if((!role || role != roles.admin) || (sort && sort == "asc")) sortStage.rating = 1

        // fetch data
        let result = await reviewModel.find({ product: productId, type: req.query?.type })
                        .sort(sortStage)
                        .skip(skip)
                        .limit(limit)
                        .populate({
                            path: "users",
                            select: "fName lName"
                        })
                        .populate({
                            path: "products",
                            select: "name"
                        })

        let count = await reviewModel.countDocuments({product: productId})
        return new apiResponse(200, {reviews: result, totalReviews: count})
    }
}

export default reviewService