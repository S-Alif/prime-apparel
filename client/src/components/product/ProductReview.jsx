import { useState } from "react"
import ReviewForm from "../review/ReviewForm"

const ProductReview = ({ productId = null, isOpen = false }) => {

    const [review, setReview] = useState(null)

    return (
        <div>
            <ReviewForm productId={productId} />
        </div>
    )
}

export default ProductReview