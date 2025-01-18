import CategoryColorSizeForm from '@/components/CategoryColorSizeForm'
import Section from '@/components/tags/Section'
import React from 'react'

const Category = () => {


  return (
    <section className="w-full h-auto" id="category-page">
      <Section
        id="category-form"
        title="Category"
      >
        <CategoryColorSizeForm
          generateForm="category"
          updating={false}
        />
      </Section>
    </section>
  )
}

export default Category