import { NavLink } from "react-router"
import { buttonVariants } from "./components/ui/button"


const App = () => {

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
                            <NavLink to="/products?category=all&color=all&page=1&limit=30" className={buttonVariants({size: "lg", variant: "outline"})}>Shop Now</NavLink>
                        </div>
                    </div>
                </div>
            </section>

            

        </section>
    )
}

export default App