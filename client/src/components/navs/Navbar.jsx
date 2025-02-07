import { useState } from "react"
import { NavLink, useLocation } from "react-router"
import { Button, buttonVariants } from "../ui/button"
import { Heart, Menu, Search, ShoppingCart, User } from "react-feather"


// nav search field
const NavSearchField = () => {

    const [value, setValue] = useState("")
    
    return(
        <div className="bg-gray-200 rounded-l-sm lg:w-[300px] xl:w-[400px] max-w-[calc(100%-20px)]">
            <div className="w-full flex">
                <input
                    type="text"
                    placeholder="Search"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="h-9 w-auto px-3 bg-transparent border-0 outline-none flex-1"
                />
                <Button size="icon"><Search /></Button>
            </div>
        </div>
    )
}


// navbar
const Navbar = () => {

    const paths = useLocation()
    const basicUserPaths = ["/login", "/signup", "/find-account", "/verification", "/create-new-password"]
    let isBasicUserPaths = basicUserPaths.includes(paths.pathname)

    const [navOpen, setNavOpen] = useState(false)

    // return nav styles
    const navStyleMaker = (isActive, active, notActive, size) => {
        return buttonVariants({
            variant: isActive ? active : notActive,
            size: size
        })
    }

    // nav links
    const navlinks = [
        {
            path: "/",
            label: "Home"
        },
        {
            path: "/shops",
            label: "Shops"
        },
        {
            path: "/product",
            label: "Products"
        },
        {
            path: "/contact",
            label: "Contact Us",
        }
    ]

    
    return (
        <nav className="w-full h-[90px] border-b-2 border-b-gray-300 sticky top-0 z-[10000] bg-white">
            <div className="container h-full">
                <div className="h-full flex justify-between items-center">

                    <div className="logo">
                        <NavLink to="/" className="font-bold text-xl lg:text-2xl">Prime <span className="text-primary">Apparel</span></NavLink>
                    </div>

                    {/* navs and search */}
                    <div className={`navs-and-search ${navOpen ? "open" : ""}`}>
                        {/* nav links */}
                        {
                            !isBasicUserPaths &&
                            <div className="flex flex-col lg:flex-row gap-4 lg:gap-4 xl:gap-14 text-center lg:text-left">
                                {
                                    navlinks.map((e, index) => (
                                        <NavLink
                                            to={e.path}
                                            className={({ isActive }) => isActive ? "navlink active" : "navlink"}
                                            key={index}
                                        >
                                            {e.label}
                                        </NavLink>
                                    ))
                                }

                            </div>
                        }


                        {/* search box */}
                        <NavSearchField />
                    </div>

                    {/* login and signup buttons */}
                    {
                        isBasicUserPaths &&
                        <div className="flex gap-2">
                            <NavLink
                                to="/login"
                                className={({ isActive }) => navStyleMaker(isActive, "default", "outline", "lg")}
                            >
                                Login
                            </NavLink>

                            <NavLink
                                to="/signup"
                                className={({ isActive }) => navStyleMaker(isActive, "default", "outline", "lg")}
                            >
                                Signup
                            </NavLink>
                        </div>
                    }

                    {/* user buttons */}
                    {
                        !isBasicUserPaths &&
                        <div className="flex gap-2">
                            <NavLink
                                to="/whish"
                                className={({ isActive }) => navStyleMaker(isActive, "default", "outline", "icon")}
                            >
                                <Heart />
                            </NavLink>

                            <NavLink
                                to="/user"
                                className={({ isActive }) => navStyleMaker(isActive, "default", "outline", "icon")}
                            >
                                <User />
                            </NavLink>

                            <NavLink
                                to="/cart"
                                className={({ isActive }) => navStyleMaker(isActive, "default", "outline", "icon")}
                            >
                                <ShoppingCart />
                            </NavLink>

                            <Button
                                variant="outline"
                                size="icon"
                                className="lg:hidden"
                                onClick={() => setNavOpen(prev => !prev)}
                            >
                                <Menu />
                            </Button>
                        </div>
                    }

                </div>                
            </div>
        </nav>
    )
}

export default Navbar