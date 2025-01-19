import CategoryColorSizePage from '@/components/categoryColorSize/CategoryColorSizePage'
import productSpecStore from '@/stores/productSpecStore'

const Colors = () => {

    const { colors } = productSpecStore()

    return (
        <CategoryColorSizePage page="color" data={colors} />
    )
}

export default Colors