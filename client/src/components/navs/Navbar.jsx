import { useLocation, useParams } from "react-router"


const Navbar = () => {

    const paths = useLocation()
    const basicNavPaths = ["/login", "/signup"]    
    let isBasicNavPaths = basicNavPaths.includes(paths.pathname)

    
    return (
        <nav className="w-full h-[111px] border-b border-b-gray">
            
        </nav>
    )
}

export default Navbar