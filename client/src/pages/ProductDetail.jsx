import apiHandler from "@/api/apiHandler"
import CardLoader from "@/components/loaders/CardLoader"
import DisplaySingleProduct from "@/components/product/DisplaySingleProduct"
import { getMethod, publicRoutes } from "@/constants/apiConstants"
import { useEffect, useState } from "react"
import { useParams } from "react-router"


const ProductDetail = () => {

    const params = useParams()
    const [product, setProduct] = useState(null)
    const [variations, setVariations] = useState([])
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)

    // fetch product data
    useEffect(() => {
        (async () => {
            setLoading(true)

            let [productData, variants, productImages] = await Promise.all([
                apiHandler(`${publicRoutes.products}/${params?.id}`, getMethod),
                apiHandler(`${publicRoutes.productVariation}/${params?.id}`, getMethod),
                apiHandler(`${publicRoutes.productImages}/${params?.id}`, getMethod),
            ])

            if(productData?.data) setProduct(productData?.data)
            if(variants?.data) setVariations(variants?.data)
            if(productImages?.data) setImages(productImages?.data)


            setLoading(false)

        })()
    }, [])

    return (
        <>
            {
                loading ? 
                <CardLoader /> :
                <DisplaySingleProduct 
                    productId={params?.id}
                    product={product}
                    variations={variations}
                    productImages={images}
                />
            }
        </>
    )
}

export default ProductDetail