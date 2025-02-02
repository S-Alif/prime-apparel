import UserStore from "@/stores/userStore"
import { NavLink } from "react-router"
import { buttonVariants } from "../ui/button"


const ProductCards = ({ product }) => {

    const {user} = UserStore()

    return (
        <div>
            <div className="mb-2 overflow-hidden rounded-md">
                <NavLink to={`/product/${product?._id}`}>
                    <img
                        className="w-full h-full object-cover object-center hover:scale-110 duration-300 shadow-sm"
                        src={user?.role == 1999 ? product.image[0] : product.image}
                        alt={product.name}
                    />
                </NavLink>
            </div>
            <div className="pt-5 flex justify-between items-center">
                <div>
                    <NavLink to={`/product/${product?._id}`}><h4 className="text-[17px] font-medium">{product.name}</h4></NavLink>
                    <NavLink
                        to={`/product?category=${product?.category?._id}&color=all&limit=30&page=1`}
                        className="text-gray-400 mt-2"
                    >
                        {product?.category?.name}
                    </NavLink>
                </div>
                <NavLink className={buttonVariants({ variant: "outline" })}>
                    {
                        product?.discount > 0 ? Math.ceil((product?.price / 100) * product?.discount) : product?.price
                    }
                    <span>&#2547;</span>
                </NavLink>
            </div>
        </div>
    )
}

export default ProductCards