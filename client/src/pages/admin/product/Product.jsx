import ManualInput from "@/components/manual-form/ManualInput"
import PaginationBox from "@/components/PaginationBox"
import Section from "@/components/tags/Section"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import productSpecStore from "@/stores/productSpecStore"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"

const Product = () => {

    const {category, colors, sizes} = productSpecStore()

    const [searchParams, setSearchParams] = useSearchParams()
    let productCategory = searchParams.get("category") || "all"
    let productColor = searchParams.get("color") || "all";
    let page = parseInt(searchParams.get("page") || "1", 10)
    let limit = parseInt(searchParams.get("limit") || "10", 10)

    const [product, setProduct] = useState([])
    const [color, setColor] = useState("all")

    const updateUrl = (name, filterValue) => {
        setSearchParams(prev => {
            return {...Object.fromEntries(prev), [name]: filterValue}
        })
    }

    // get product data
    // useEffect(() => {
    // }, [page, limit, productCategory, color])


    return (
        <section className="page-wrapper" id="product-page">
            <Section
                id="display-product"
                title="Product List"
            >
                <div className="content-wrapper">

                    {/* filter fields */}
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
                                    { _id: "10", name: "10" },
                                    { _id: "20", name: "20" },
                                    { _id: "40", name: "40" },
                                ]}
                                defaultValue="10"
                                fieldLabel="Amount of products"
                                name="limit"
                                onChange={updateUrl}
                            />
                        </div>
                    </div>

                    {/* table */}
                    <Table>
                        <TableHeader>
                            <TableHead className="font-bold text-[17px] lg:text-xl">#</TableHead>
                            <TableHead className="font-bold text-[17px] lg:text-xl">Product</TableHead>
                            <TableHead className="font-bold text-[17px] lg:text-xl">Category</TableHead>
                            <TableHead className="font-bold text-[17px] lg:text-xl">Color</TableHead>
                            <TableHead className="font-bold text-[17px] lg:text-xl">Price</TableHead>
                            <TableHead className="font-bold text-[17px] lg:text-xl">Published</TableHead>
                            <TableHead className="font-bold text-[17px] lg:text-xl">Actions</TableHead>
                        </TableHeader>

                        <TableBody>
                            
                        </TableBody>
                    </Table>

                    {/* pagination */}
                    <div className="pt-16">
                        <PaginationBox
                            totalPage={10}
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