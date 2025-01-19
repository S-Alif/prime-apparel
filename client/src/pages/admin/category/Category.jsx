import CategoryColorSizePage from '@/components/categoryColorSize/CategoryColorSizePage'
import productSpecStore from '@/stores/productSpecStore'

const Category = () => {

  const {category} = productSpecStore()

  return (
    <CategoryColorSizePage page="category" data={category}  />
  )
}

export default Category