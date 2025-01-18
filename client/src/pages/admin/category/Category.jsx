import CategoryColorSizePage from '@/components/categoryColorSize/CategoryColorSizePage'
import productSpecStore from '@/stores/productSpecStore'

const Category = () => {

  const {category} = productSpecStore()
  console.log(category)

  return (
    <CategoryColorSizePage page="category" data={category}  />
  )
}

export default Category