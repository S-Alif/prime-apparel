import { useState } from "react"
import StarRatings from "react-star-ratings"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { infoToast } from "@/helpers/toasts"
import UserStore from "@/stores/userStore"


const ReviewForm = ({ productId = null }) => {

    const {user} = UserStore()

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const submitReview = () => {
        if (comment.trim().length <= 5 || comment.trim().length >= 300) {
            return infoToast("Comment length should be between 5 - 300 characters")
        }

        const data = {
            rating,
            comment,
            ...(productId && { product: productId}),
            type: productId ? "product" : "site"
        }
    }

    return (
        <section className="w-full h-auto py-10">
            <h3 className="text-[22px]">Give a review</h3>

            {/* rating and review */}
            <div className="pt-10">
                <StarRatings
                    rating={rating}
                    starRatedColor="red"
                    changeRating={(e) => setRating(e)}
                    numberOfStars={5}
                    name='rating'
                    starDimension="20px"
                    starSpacing="10px"
                />
                <Textarea 
                    placeholder={productId ? "Write a product review" : "Write a service review"}
                    className="mt-5 resize-none"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={5}
                />
                <Button 
                    size="lg"
                    disabled={rating == 0 || (user == null || user?.role != 1999)}
                    onClick={submitReview}
                    className="mt-10"
                >
                    Submit review
                </Button>
            </div>
        </section>
    )
}

export default ReviewForm