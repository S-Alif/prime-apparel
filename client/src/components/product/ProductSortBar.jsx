import productSpecStore from "@/stores/productSpecStore"
import { Palette, SlidersHorizontal, X } from "lucide-react"
import { useSearchParams } from "react-router"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Button } from "../ui/button"

const ProductSortBar = ({sideBar = false, toogleSideBar}) => {

    const {category, colors} = productSpecStore()

    // getting search params
    const [searchParams, setSearchParams] = useSearchParams()
    let productCategory = searchParams.get("category") || "all"
    let productColor = searchParams.get("color") || "all"

    return (
        <section className={`w-[330px] h-[calc(100vh-90px)] top-[90px] ${sideBar ? "left-0" : "-left-[350px]"} fixed bg-white transition-all duration-300 px-6 z-30 border-r overflow-y-auto`}>
            <div className="h-full">
                <h3 className="text-xl py-4 flex justify-between border-b">
                    <span>Filter</span>
                    <span className="block lg:hidden">
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={toogleSideBar}
                        >
                            <X size={30} />
                        </Button>
                    </span>
                    <span className="hidden lg:block"><SlidersHorizontal /></span>
                </h3>

                {/* categories */}
                <div className="pt-10">
                    <RadioGroup 
                        defaultValue={productCategory}
                        onValueChange={(value) => {
                            setSearchParams(prev => {
                                return { ...Object.fromEntries(prev), category: value }
                            })
                        }}
                    >
                        <div className="flex gap-7 items-center">
                            <RadioGroupItem value="all" id="all" />
                            <label htmlFor="all" className="text-[17px] cursor-pointer">All</label>
                        </div>

                        {
                            category.length > 0 &&
                            category.map((e, index) => (
                                <div className="flex gap-7 items-center" key={index}>
                                    <RadioGroupItem value={e?._id} id={e?._id} />
                                    <label htmlFor={e?._id} className="text-[17px] cursor-pointer">{e?.name}</label>
                                </div>
                            ))
                        }


                    </RadioGroup>
                </div>

                {/* colors */}
                <div className="pt-6">
                    <h3 className="text-xl py-4 flex justify-between border-b">Colors <span><Palette /></span></h3>

                    <div className="pt-10">
                        <div className="grid grid-cols-4 gap-5">
                            <div className="text-center">
                                <Button 
                                    size="icon"
                                    variant="outline"
                                    className={`${productColor == "all" && "border-black drop-shadow-lg"}`}
                                    onClick={() => {
                                        setSearchParams(prev => {
                                            return { ...Object.fromEntries(prev), color: "all" }
                                        })
                                    }}
                                ></Button>
                                <p className="capitalize pt-3">All</p>
                            </div>

                            {
                                colors.length > 0 &&
                                colors.map((e, index) => (
                                    <div className="text-center" key={index}>
                                        <Button 
                                            size="icon"
                                            variant="outline"
                                            className={`${productColor == e?._id && "drop-shadow-lg"} border-none`}
                                            onClick={() => {
                                                setSearchParams(prev => {
                                                    return { ...Object.fromEntries(prev), color: e?._id }
                                                })
                                            }}
                                            style={{
                                                backgroundColor: e?.colorValue || "red"
                                            }}
                                        ></Button>
                                        <p className="capitalize pt-3">{e?.name}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductSortBar