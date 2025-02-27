import ReviewForm from "../review/ReviewForm"

const ProductReview = ({productId = null, isOpen = false}) => {
  return (
    <div>
      <ReviewForm productId={productId} />
    </div>
  )
}

export default ProductReview