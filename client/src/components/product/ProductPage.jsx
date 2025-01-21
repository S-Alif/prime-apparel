import Section from '../tags/Section'
import ProductForm from './ProductForm'

const ProductPage = ({page = "add"}) => {
    
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