import { useEffect, useState } from 'react'
import Section from '../tags/Section'
import ProductForm from './ProductForm'
import { useParams } from 'react-router'
import VariationForm from './variation/VariationForm'
import DialogBox from '../DialogBox'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Edit3 } from 'react-feather'

const ProductPage = ({page = "add", data = null}) => {

    const params = useParams()
    const [product, setProduct] = useState(data || null)
    const [variations, setVariations] = useState([])
    const [images, setImages] = useState([])
    console.log(product)
    console.log(variations)

    
    return (
        <section className="page-wrapper" id={`product-${page}-page`}>
            <Section id="product-add" title={`${page} Product`}>
                <div className="content-wrapper">

                    {/* add variation and update image buttons */}

                    {
                        product != null &&
                        <div className="pb-8 flex justify-end gap-4">
                            <DialogBox
                                trigger={<Button size="lg">Add Variations</Button>}
                                dialogTitle="Add a variation"
                            >
                                <VariationForm
                                    updating={false}
                                    returnData={(data) => setVariations(prev => [...prev, data])}
                                    productId={product?._id}
                                />
                            </DialogBox>

                            <DialogBox
                                trigger={<Button size="lg">Add Images</Button>}
                                dialogTitle="Add product images"
                            >
                                product images
                            </DialogBox>
                        </div>
                    }

                    <div>
                        <ProductForm updating={false} returnData={setProduct} />
                    </div>
                </div>
            </Section>

            {/* product variation */}
            {
                variations.length > 0 &&
                <Section id="product-variation" title={`Product Variations`}>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                        {variations.map((e, index) => (
                            <Card className="p-4" key={index}>
                                <p className="font-bold text-xl">Size: <span className="font-normal">{e?.name}</span></p>
                                <p className="font-bold text-xl">Stock: <span className="font-normal">{e?.stock}</span></p>
                                <div className="text-right pt-5">
                                    <DialogBox
                                        trigger={<Button size="icon" className="!bg-green-500"><Edit3 /></Button>}
                                        dialogTitle="Add a variation"
                                    >
                                        <VariationForm
                                            updating={true}
                                            data={e}
                                            productId={product?._id}
                                            returnData={(e) => {
                                                setVariations(prev => prev.map((variation) => variation?._id === e?._id ? e : variation))
                                            }}
                                        />
                                    </DialogBox>
                                </div>
                            </Card>
                        ))}
                    </div>
                </Section>
            }
        </section>
    )
}

export default ProductPage