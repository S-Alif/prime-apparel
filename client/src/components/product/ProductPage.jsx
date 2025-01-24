import { useEffect, useState } from 'react'
import Section from '../tags/Section'
import ProductForm from './ProductForm'
import { useParams } from 'react-router'
import VariationForm from './variation/VariationForm'
import DialogBox from '../DialogBox'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Edit3 } from 'react-feather'
import apiHandler from '@/api/apiHandler'
import { adminRoutes, getMethod } from '@/constants/apiConstants'
import ImageForm from './images/ImageForm'

const ProductPage = ({page = "add"}) => {

    const params = useParams()
    const [product, setProduct] = useState(null)
    const [variations, setVariations] = useState([])
    const [images, setImages] = useState([])

    // fetch all the data
    useEffect(() => {
        if(page == "update" && params?.productId){
            (async () => {
                let [productData, productVariation, productImages] = await Promise.all([
                    apiHandler(`${adminRoutes.products}/${params?.productId}`, getMethod),
                    apiHandler(`${adminRoutes.productVariation}/${params?.productId}`, getMethod),
                    apiHandler(`${adminRoutes.productImage}/${params?.productId}`, getMethod)
                ])

                if(productData) setProduct(productData?.data)
                if(productVariation) setVariations(productVariation?.data)
                if(productImages) setImages(productImages?.data)
            })()
        }
    }, [])

    
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
                                    returnData={(e) => setVariations(prev => [...prev, e])}
                                    productId={product?._id}
                                />
                            </DialogBox>

                            <DialogBox
                                trigger={<Button size="lg">Add Images</Button>}
                                dialogTitle="Add product images"
                            >
                                <ImageForm 
                                    productId={product?._id}
                                    returnData={(e) => setImages(prev => [...prev, ...e])}
                                />
                            </DialogBox>
                        </div>
                    }

                    <div>
                        <ProductForm 
                            updating={page == "update"}
                            returnData={setProduct}
                            data={(page == "update" && product != null) ? product : {}}
                        />
                    </div>
                </div>
            </Section>

            {/* product variation */}
            {
                variations.length > 0 &&
                <Section id="product-variation" title={`Product Variations`}>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {variations.map((e, index) => (
                            <Card className="p-4" key={index}>
                                <p className="font-bold text-xl">Size: <span className="font-normal">{e?.size?.name}</span></p>
                                <p className="font-bold text-xl">Stock: <span className="font-normal">{e?.stock}</span></p>
                                <div className="text-right pt-5">
                                    <DialogBox
                                        trigger={<Button size="icon" className="!bg-green-500"><Edit3 /></Button>}
                                        dialogTitle={<p>Update <span className="text-primary">{e?.size?.name}</span> variation</p>}
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

            {/* product images */}
            {
                images.length > 0 &&
                <Section id="product-images" title={`Product Images`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {images.map((e, index) => (
                            <Card className="p-4" key={index}>
                                <img src={e?.url} alt={e?.name} className="w-full h-48 object-cover" />
                            </Card>
                        ))}
                    </div>
                </Section>
            }
        </section>
    )
}

export default ProductPage