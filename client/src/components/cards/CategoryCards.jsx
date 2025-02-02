import { ArrowRight } from "lucide-react"
import { NavLink } from "react-router"


const CategoryCards = ({ category }) => {

    return (
        <div>
            <div className="pb-2 overflow-hidden">
                <img className="w-full h-full object-cover object-center rounded-md" src={category.image} alt={category.name} />
            </div>
            <NavLink to={`/product?category=${category?._id}&color=all&limit=30&page=1`} className="pt-5 flex justify-between items-center">
                <div>
                    <h4 className="text-[17px] xl:text-xl">{category?.name}</h4>
                    <p>Explore now</p>
                </div>
                <p><ArrowRight /></p>
            </NavLink>
        </div>
    )
}

export default CategoryCards