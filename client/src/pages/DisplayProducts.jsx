import apiHandler from "@/api/apiHandler"
import ProductCards from "@/components/cards/ProductCards"
import CardLoader from "@/components/loaders/CardLoader"
import PaginationBox from "@/components/PaginationBox"
import ProductSortBar from "@/components/product/ProductSortBar"
import SectionUsers from "@/components/tags/SectionUsers"
import { Toggle } from "@/components/ui/toggle"
import { getMethod, publicRoutes } from "@/constants/apiConstants"
import { ListFilter } from "lucide-react"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"


const DisplayProducts = () => {

    const [products, setProducts] = useState([])
    const [totalProducts, setTotalProducts] = useState(0)
    const [sidebarActive, setSidebarActive] = useState(false)
    const [loading, setLoading] = useState(false)

    // get params
    const [searchParams, setSearchParams] = useSearchParams()
    let productCategory = searchParams.get("category") || "all"
    let productColor = searchParams.get("color") || "all"
    let page = parseInt(searchParams.get("page") || "1", 10)
    let limit = 40

    // fetch products
    useEffect(() => {
        (async () => {
            setLoading(true)
            let result = await apiHandler(`${publicRoutes.products}?category=${productCategory}&color=${productColor}&limit=${limit}&page=${page}`, getMethod)
            if(!result) return
            setProducts(result.data.products)
            setTotalProducts(result.data.totalProducts)
            setSearchParams(prev => {
                return { ...Object.fromEntries(prev), page: 1 }
            })
            setTimeout(() => setLoading(false), 1000)
        })()
    }, [productCategory, productColor, page])


    return (
        <section className="w-full h-auto" id="display-products">

            {/* product sort sidebar */}
            <ProductSortBar sideBar={sidebarActive} toogleSideBar={() => setSidebarActive(prev => !prev)} />
            {/* display products */}
            <SectionUsers
                sectionId="display-product-cards"
                sectionTtitle="Our Products"
                sectionClassNames={`relative ${sidebarActive ? "lg:pl-[300px]" : ""} transition-all duration-300`}
                loading={loading}
                loadingFallback={<CardLoader numberOfCards={11} container={false} />}
            >

                <div className="absolute top-[55px] right-0 -translate-x-2 lg:translate-x-[-50%]">
                    <Toggle 
                        size="lg"
                        pressed={sidebarActive}
                        onPressedChange={() => {
                            setSidebarActive(prev => !prev)
                        }}
                        className={`${sidebarActive ? "!bg-primary !text-white hover:!bg-primary hover:!text-white" : "!bg-transparent border"} px-7 py-4 text-xl lg:text-[17px]`}
                    >
                        <span className="hidden lg:block">Filter</span> <span><ListFilter /></span>
                    </Toggle>
                </div>
                <div className={`grid grid-cols-2 gap-4 md:grid-cols-2 lg:gap-5 xl:gap-10 ${sidebarActive ? "lg:grid-cols-2 xl:grid-cols-4" : "lg:grid-cols-4 xl:grid-cols-5"} transition-all duration-300`}>
                    {
                        products.length == 0 &&
                        <div className="pt-10"><p className="text-2xl">No products found</p></div>
                    }
                    {
                        products.map((product, index) => (
                            <ProductCards product={product} key={index} />
                        ))
                    }
                </div>

                {/* pagination */}
                {
                    totalProducts > 0 &&
                    <div className="pt-10">
                        <PaginationBox
                            totalPage={Math.ceil(totalProducts / limit)}
                            currentPage={page}
                            onPageChange={(page) => {
                                setSearchParams(prev => {
                                    return { ...Object.fromEntries(prev), page: page }
                                })
                            }}
                        />
                    </div>
                }

            </SectionUsers>

        </section>
    )
}

export default DisplayProducts