import { NavLink } from "react-router"
import { buttonVariants } from "./components/ui/button"
import SectionUsers from "./components/tags/SectionUsers"
import productSpecStore from "./stores/productSpecStore"
import CategoryCards from "./components/cards/CategoryCards"
import ProductCards from "./components/cards/ProductCards"
import CardLoader from "./components/loaders/CardLoader"


const App = () => {

    const { category, newArrivals, featuredProducts } = productSpecStore()

    return (
        <section className="w-full h-auto" id="home-page">

            {/* Home section */}
            <section
                id="home-section"
                className="bg-cover bg-no-repeat bg-center w-full h-[calc(100vh-90px)]"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0)), url('https://images.unsplash.com/photo-1523380744952-b7e00e6e2ffa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
                }}
            >
                <div className="container h-full lg:px-10">
                    <div className="h-full flex flex-col justify-center">
                        <p className="text-[32px] text-white">Any apparels</p>
                        <h3 className="text-[78px] py-5 font-bold text-white">Find Best Deals</h3>
                        <p className="text-[32px] text-white">Cool / Comfy / Colorful</p>
                        <div className="pt-10">
                            <NavLink to="/product" className={buttonVariants({size: "lg", variant: "outline"})}>Shop Now</NavLink>
                        </div>
                    </div>
                </div>
            </section>

            
            {/* new arrival */}
            <SectionUsers
                sectionTtitle="New Arrivals"
                sectionId="new-arrivals"
                loading={newArrivals.length == 0}
                loadingFallback={<CardLoader />}
            >
                <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-10">
                    {
                        newArrivals.map((e, index) => (
                            <ProductCards product={e} key={index} />
                        ))
                    }
                </div>

            </SectionUsers>
            

            {/* static section */}
            <section className="py-[50px]" id="go-to-shop">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-lg">

                        <div className="relative">
                            <img 
                                className="w-full-h-full object-cover object-center" 
                                src="https://images.unsplash.com/photo-1470439058509-295625152166?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="go-to-shop-left-img" 
                            />
                            <div className="absolute w-full h-full top-0 left-0 bg-black/50 flex justify-center items-start flex-col px-5 md:px-10 lg:px-8 xl:px-[70px]">
                                <h4 className="uppercase text-xl lg:text-3xl xl:text-4xl text-white !leading-normal">We made your everyday fashion better</h4>
                                <p className="text-white lg:pt-5 xl:pt-[30px] lg:text-xl">In our quest to elevate everyday fashion, we present EVERYDAY wear range - Comfortable & Affordable fashion 24/7</p>
                                <div className="pt-10">
                                    <NavLink to="/product" className={buttonVariants({ size: "lg", variant: "outline" })}>Shop Now</NavLink>
                                </div>
                            </div>
                        </div>

                        <div>
                            <img 
                                className="w-full-h-full object-cover object-center" 
                                src="https://images.unsplash.com/photo-1484712401471-05c7215830eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="go-to-shop-right-img" 
                            />
                        </div>

                    </div>
                </div>
            </section>

            {/* categories */}
            <SectionUsers
                sectionTtitle="Our Categories"
                sectionId="display-category"
                loading={category.length == 0}
                loadingFallback={<CardLoader />}
            >
                <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-10">
                    {
                        category.map((e, index) => (
                            <CategoryCards category={e} key={index} />
                        ))
                    }
                </div>

            </SectionUsers>

            {/* featured products */}
            <SectionUsers
                sectionTtitle="Featured products"
                sectionId="featured-products"
                loading={featuredProducts.length == 0}
                loadingFallback={<CardLoader />}
            >
                <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-10">
                    {
                        featuredProducts.map((e, index) => (
                            <ProductCards product={e} key={index} />
                        ))
                    }
                </div>

            </SectionUsers>

            

        </section>
    )
}

export default App