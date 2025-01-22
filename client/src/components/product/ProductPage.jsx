import { useEffect, useState } from 'react'
import Section from '../tags/Section'
import ProductForm from './ProductForm'
import { useLocation, useParams } from 'react-router'

const ProductPage = ({page = "add", data = null}) => {

    const params = useLocation()
    const [product, setProduct] = useState(data || null)


    
    return (
        <section className="page-wrapper" id={`product-${page}-page`}>
            <Section id="product-add" title={`${page} Product`}>
                <div className="content-wrapper">
                    <ProductForm updating={false} />
                </div>
            </Section>
        </section>
    )
}

export default ProductPage