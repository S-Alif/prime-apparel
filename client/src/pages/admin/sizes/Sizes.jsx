import CategoryColorSizePage from '@/components/categoryColorSize/CategoryColorSizePage'
import productSpecStore from '@/stores/productSpecStore'

const Sizes = () => {

    const { sizes } = productSpecStore()

    return (
        <CategoryColorSizePage page="sizes" data={sizes} />
    )
}

export default Sizes