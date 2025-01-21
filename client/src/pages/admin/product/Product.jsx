import apiHandler from "@/api/apiHandler"
import ManualInput from "@/components/manual-form/ManualInput"
import PaginationBox from "@/components/PaginationBox"
import Section from "@/components/tags/Section"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { adminRoutes, getMethod } from "@/constants/apiConstants"
import { successToast } from "@/helpers/toasts"
import productSpecStore from "@/stores/productSpecStore"
import { ListFilter } from "lucide-react"
import { useEffect, useState } from "react"
import { Edit3, Info, X } from "react-feather"
import { NavLink, useSearchParams } from "react-router"

const Product = () => {

    const {category, colors } = productSpecStore()

    // getting search params
    const [searchParams, setSearchParams] = useSearchParams()
    let productCategory = searchParams.get("category") || "all"
    let productColor = searchParams.get("color") || "all";
    let page = parseInt(searchParams.get("page") || "1", 10)
    let limit = parseInt(searchParams.get("limit") || "30", 10)

    const [product, setProduct] = useState([])
    const [totalProducts, setTotalProducts] = useState(0)
    const [displayFilters, setDisplayFilters] = useState(false)

    // updating the url
    const updateUrl = (name, filterValue) => {
        setSearchParams(prev => {
            return {...Object.fromEntries(prev), [name]: filterValue}
        })
    }

    // get product data
    useEffect(() => { 
        (async () => {
            let result = await apiHandler(`${adminRoutes.products}?page=${page}&limit=${limit}&category=${productCategory}&color=${productColor}`, getMethod)
            if(!result) return
            successToast("Product fetched successfully")
            setProduct(result.data.products)
            setTotalProducts(result.data.totalProducts)
        })()
    }, [page, limit, productCategory, productColor])


    return (
        <section className="page-wrapper" id="product-page">
            <Section
                id="display-product"
                title="Product List"
            >
                <div className="content-wrapper">

                    {/* filter button and add product page link */}
                    <div className="pb-10 flex justify-between items-center">
                        <Button size="lg" variant="outline" onClick={() => setDisplayFilters(prev => !prev)}>
                            Filters <ListFilter />
                        </Button>

                        <NavLink to="/admin/products/add" className={buttonVariants({size:"lg", variant: "default"})}>Add Product</NavLink>
                    </div>

                    {/* filter fields */}
                    {
                        displayFilters &&
                        <div className="pb-16">
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <ManualInput
                                    field="select"
                                    selectValues={[{ _id: "all", name: "All" }, ...category]}
                                    defaultValue="all"
                                    fieldLabel="Select category"
                                    name="category"
                                    onChange={updateUrl}
                                />

                                <ManualInput
                                    field="select"
                                    selectValues={[{ _id: "all", name: "All" }, ...colors]}
                                    defaultValue="all"
                                    fieldLabel="Select color"
                                    name="color"
                                    onChange={updateUrl}
                                />

                                <ManualInput
                                    field="select"
                                    selectValues={[
                                        { _id: "30", name: "30" },
                                        { _id: "50", name: "50" },
                                        { _id: "80", name: "80" },
                                    ]}
                                    defaultValue="30"
                                    fieldLabel="Amount of products"
                                    name="limit"
                                    onChange={updateUrl}
                                />
                            </div>
                        </div>
                    }

                    {/* table */}
                    <Table>
                        <TableHeader className="border-b">
                            <TableHead className="font-bold text-[17px] lg:text-[17px]">#</TableHead>
                            <TableHead className="font-bold text-[17px] lg:text-[17px]">Product</TableHead>
                            <TableHead className="font-bold text-[17px] lg:text-[17px]">Category</TableHead>
                            <TableHead className="font-bold text-[17px] lg:text-[17px]">Color</TableHead>
                            <TableHead className="font-bold text-[17px] lg:text-[17px]">Price</TableHead>
                            <TableHead className="font-bold text-[17px] lg:text-[17px]">Published</TableHead>
                            <TableHead className="font-bold text-[17px] lg:text-[17px]">Actions</TableHead>
                        </TableHeader>

                        <TableBody>
                            {
                                product.length > 0 &&
                                product.map((e,index) => (
                                    <TableRow>
                                        <TableCell className="text-[17px] border-r">{((page-1)*limit) + 1 + index}</TableCell>
                                        <TableCell className="text-[17px] border-r">{e?.name}</TableCell>
                                        <TableCell className="text-[17px] border-r">
                                            <Button variant="outline" onClick={() => updateUrl("category", e?.category?._id)}>{e?.category?.name}</Button>
                                        </TableCell>
                                        <TableCell className="text-[17px] border-r">
                                            <Button 
                                                variant="ghost"
                                                onClick={() => updateUrl("color", e?.color?._id)}
                                            >
                                                <div className="flex gap-4 items-center">
                                                    <div className="w-10 h-10 rounded-full border" style={{ backgroundColor: e?.color?.colorValue }}></div>
                                                    <p>{e?.color?.name}</p>
                                                </div>
                                            </Button>
                                        </TableCell>
                                        <TableCell className="text-[17px] border-r">{e?.price}</TableCell>
                                        <TableCell className="text-[17px] border-r">{e?.published ? "Yes" : "No"}</TableCell>
                                        <TableCell className="text-[17px] flex gap-3">
                                            <Button size="icon" className="!bg-green-500"><Edit3 /></Button>
                                            <Button size="icon" variant="destructive"><X /></Button>
                                            <Button size="icon" className="!bg-blue-500"><Info /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>

                    {/* pagination */}
                    <div className="pt-16">
                        <PaginationBox
                            totalPage={Math.ceil(totalProducts / limit)}
                            currentPage={page}
                            onPageChange={(e) => updateUrl("page", e)}
                        />
                    </div>
                    
                </div>
            </Section>
        </section>
    )
}

export default Product