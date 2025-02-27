import { useEffect, useRef, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Card } from '../ui/card'
import StarRatings from 'react-star-ratings'
import { Button, buttonVariants } from '../ui/button'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import { NavLink } from 'react-router'
import { CreditCard, MessageSquareMore, Minus, Plus, Shirt, ShoppingCart } from 'lucide-react'
import SectionUsers from '../tags/SectionUsers'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import ProductReview from './ProductReview'


const DisplaySingleProduct = ({
    productId,
    product = null,
    variations = [],
    productImages = []
}) => {

    const [productData, setProduct] = useState(product)
    const [variation, setVariations] = useState(variations)
    const [images, setImages] = useState(productImages)
    const [currentSlide, setCurrentSlide] = useState(1)
    const [productSelection, setProductSelection] = useState({
        product: productId,
        size: "",
        quantity: 0
    })

    const carouselRef = useRef(null)

    // show the number of the image showing in the carousel
    useEffect(() => {
        const items = carouselRef.current?.querySelectorAll('.carousel-item')
        const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        let index = Array.from(items).indexOf(entry.target)
                        setCurrentSlide(index + 1)
                    }
                })
            },
            {
                root: carouselRef.current,
                threshold: 0.6,
            }
        )

        items?.forEach((item) => observer.observe(item))

        return () => {
            items?.forEach((item) => observer.unobserve(item))
        }
    }, [images])



    return (
        <section className="w-full h-auto" id="display-single-product">
            <section className="w-full h-auto py-[50px]" id="product-details">
                <div className="container">
                    <div className="flex flex-col lg:flex-row gap-20 xl:gap-32">

                        {/* carousel */}
                        <div className="lg:ml-10 lg:basis-1/2 xl:basis-1/3 relative">
                            <Carousel ref={carouselRef}>
                                <CarouselContent>
                                    {
                                        images.length > 0 &&
                                        images.map((e, index) => (
                                            <CarouselItem key={index} className="carousel-item overflow-hidden md:basis-1/2 lg:basis-full">
                                                <Card className="overflow-hidden rounded-md border-0 lg:shadow-md">
                                                    <img src={e?.url} alt={productData?.name} className="lg:w-full lg:h-full aspect-square mx-auto rounded-md" />
                                                </Card>
                                            </CarouselItem>
                                        ))
                                    }
                                </CarouselContent>
                                <CarouselNext />
                                <CarouselPrevious />
                            </Carousel>

                            <div className="py-2 px-3 rounded-sm text-center absolute top-5 left-5 z-10 bg-white">
                                <p className="text-sm text-black">{currentSlide} / {images.length}</p>
                            </div>
                        </div>

                        {/* details */}
                        <div>
                            <h1 className="text-xl lg:text-2xl xl:text-3xl">{productData?.name}</h1>

                            {/* ratings */}
                            <div className="pt-5 flex gap-5 items-center">
                                <div>
                                    <StarRatings
                                        rating={productData?.currentRating}
                                        starRatedColor="yellow"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="20px"
                                        starSpacing="10px"
                                    />
                                </div>
                                <p className="text-[17px] pt-1 text-gray-400 flex items-center">
                                    {productData?.currentRating}
                                    <span className='pl-5 flex items-center'>
                                        <span className="pr-1"><MessageSquareMore /></span> {productData?.reviewCount} reviews
                                    </span>
                                </p>
                            </div>

                            {/* sizes */}
                            <div className="pt-4 xl:pt-9">
                                <h4 className="text-[17px] xl:text-xl font-medium">Select size</h4>
                                {/* buttons */}
                                <div className="flex gap-3 pt-5">
                                    <ToggleGroup 
                                        type="single"
                                        variant="outline"
                                        size="sm"
                                        className="gap-5"
                                        value={productSelection?.size} 
                                        onValueChange={(value) => {
                                            setProductSelection((prev) => ({
                                                ...prev,
                                                size: value
                                            }))
                                        }}
                                    >
                                        {
                                            variation.length > 0 &&
                                            variation.map((e, index) => (
                                                <ToggleGroupItem 
                                                    value={e?.size?._id}
                                                    aria-label={`Toggle ${e?.size?.name}`}
                                                    key={index}
                                                    className={`${productSelection?.size == e?.size?._id ? "!bg-black !text-white hover:!bg-black hover:!text-white" : ""}`}
                                                >
                                                    {e?.size?.name}
                                                </ToggleGroupItem>
                                            ))
                                        }
                                    </ToggleGroup>
                                </div>
                            </div>

                            {/* color */}
                            <div className="pt-7">
                                <div className="flex gap-3 items-center">
                                    <h4 className="text-[17px] xl:text-xl font-medium">Product color : </h4>
                                    <NavLink
                                        to={`/product?color=${product?.color?._id}`}
                                        className={buttonVariants({ size: "icon" })}
                                        style={{
                                            background: product?.color?.colorValue
                                        }}
                                    />
                                </div>
                            </div>

                            {/* quantity */}
                            <div className="pt-7">
                                <div className="flex gap-3 items-center">
                                    <h4 className="text-[17px] xl:text-xl font-medium">Quantity : </h4>
                                    <Button
                                        disabled={productSelection?.quantity <= 1}
                                        size="icon"
                                        variant="outline"
                                        onClick={() => {
                                            setProductSelection((prev) => ({
                                                ...prev,
                                                quantity: prev?.quantity - 1
                                            }))
                                        }}
                                    >
                                        <Minus />
                                    </Button>
                                    <p>{productSelection?.quantity}</p>
                                    <Button
                                        disabled={productSelection?.quantity >= 5}
                                        size="icon"
                                        variant="outline"
                                        onClick={() => {
                                            setProductSelection((prev) => ({
                                                ...prev,
                                                quantity: prev?.quantity + 1
                                            }))
                                        }}
                                    >
                                        <Plus />
                                    </Button>
                                </div>
                            </div>

                            {/* buttons */}
                            <div className="pt-7 flex gap-5">
                                <Button size="lg" disabled={productSelection.size == ""}><span><ShoppingCart /></span> Add to Cart</Button>
                                <Button size="lg" variant="outline" disabled={productSelection.size == ""}>
                                    {
                                        productData?.discount ? 
                                        <span>
                                            <span className="line-through">{productData?.price}</span>
                                            {Math.ceil((productData?.price / 100) / productData?.discount)}
                                        </span>
                                        : productData?.price
                                    }
                                    <span className="pl-0.5">&#2547;</span>
                                </Button>
                            </div>

                            {/* static */}
                            <div className="pt-7 mt-10 border-t flex justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-md bg-gray-200 flex justify-center items-center"><CreditCard className='text-gray-600' /></span>
                                    Secure payment
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-md bg-gray-200 flex justify-center items-center"><Shirt className='text-gray-600' /></span>
                                    Soft and Cozy
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* description */}
            <SectionUsers
                sectionId="product-info"
                sectionTtitle="Product Description"
                sectionClassNames="inline-block"
            >
                <Tabs defaultValue="description" className="w-full h-12 max-w-full">
                    <TabsList className="w-[600px] max-w-full h-full justify-around">
                        <TabsTrigger value="description" className="w-1/2 h-full text-[17px]">Description</TabsTrigger>
                        <TabsTrigger value="reviews" className="w-1/2 h-full text-[17px]">User reviews</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description">
                        <div className="detail mt-8 p-3 rounded-md border-2 w-full" dangerouslySetInnerHTML={{__html: productData?.detail}} />
                    </TabsContent>
                    <TabsContent value="reviews"><ProductReview productId={productId} /></TabsContent>
                </Tabs>

            </SectionUsers>

            <div className="py-[50px]"></div>
        </section>
    )
}

export default DisplaySingleProduct