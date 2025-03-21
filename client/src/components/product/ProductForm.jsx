import productSpecStore from "@/stores/productSpecStore"
import ManualForm from "../manual-form/ManualForm"
import ManualInput from "../manual-form/ManualInput"
import { adminRoutes, patchMethod, postMethod } from "@/constants/apiConstants"
import apiHandler from "@/api/apiHandler"
import { successToast } from "@/helpers/toasts"
import { validateProduct } from "@/helpers/validationHelper"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"


const ProductForm = ({ data = {}, updating = false, returnData }) => {

    const {category, colors} = productSpecStore()
    const navigate = useNavigate()

    const [defaultValues, setDefaultValues] = useState({
        name: "",
        detail: "",
        price: "0",
        category: "",
        color: ""
    })
    
    // if updating then add the updating data to default value
    useEffect(() => {
        if (updating && Object.keys(data).length > 0) {
            let newValues = {
                name: data?.name || "",
                detail: data?.detail || "",
                price: data?.price ? data?.price?.toString() : "0",
                category: data?.category?._id || "",
                color: data?.color?._id || "",
                published: data?.published ? "1" : "0",
                featured: data?.featured ? "1" : "0",
                setAsNewArrival: data?.setAsNewArrival ? "1" : "0",
                discount: data?.discount ? data?.discount?.toString() : "0",
            }
            setDefaultValues(newValues)
        }
    }, [data])

    let url = adminRoutes.products
    if (updating) url = `${adminRoutes.products}/${data?._id}`

    // submit update or add product
    const formSubmit = async (e) => {
        if(!validateProduct(e, updating)) return

        let result = await apiHandler(url, updating ? patchMethod : postMethod, e)
        if(!result) return
        returnData(result?.data)
        successToast(updating ? "Product updated" : "Product added")
        if(!updating) navigate(`/admin/products/update/${result.data?._id}`)
    }


    return (
        <div>
            <ManualForm
                formId={`product ${updating ? "update" : "add"} form`}
                buttonText={`${updating ? "Update" : "Add"} product`}
                buttonSize="lg"
                onSubmit={formSubmit}
                defaultValues={defaultValues}
            >
                <ManualInput 
                    field="input"
                    fieldType="text"
                    fieldLabel="Product name"
                    name="name"
                    placeholder="Enter product name"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <ManualInput
                        field="select"
                        fieldLabel="Category"
                        name="category"
                        placeholder="Select category"
                        selectValues={category}
                    />
                    <ManualInput
                        field="select"
                        fieldLabel="Color"
                        name="color"
                        placeholder="Select color"
                        selectValues={colors}
                    />
                    <ManualInput
                        field="input"
                        fieldType="text"
                        fieldLabel="Price"
                        name="price"
                        placeholder="Enter product price"
                    />
                </div>

                {
                    updating && 
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        <ManualInput
                            field="select"
                            fieldLabel="Published"
                            name="published"
                            selectValues={[
                                {_id: "1", name: "Yes"},
                                {_id: "0", name: "NO"}
                            ]}
                            placeholder="Publish status"
                        />
                        <ManualInput
                            field="select"
                            fieldLabel="Featured"
                            name="featured"
                            selectValues={[
                                {_id: "1", name: "Yes"},
                                {_id: "0", name: "NO"}
                            ]}
                            placeholder="Featured status"
                        />
                        <ManualInput
                            field="select"
                            fieldLabel="New Arrival"
                            name="setAsNewArrival"
                            selectValues={[
                                {_id: "1", name: "Yes"},
                                {_id: "0", name: "NO"}
                            ]}
                            placeholder="New arrival"
                        />
                        <ManualInput
                            field="input"
                            fieldType="text"
                            fieldLabel="Discount"
                            name="discount"
                            placeholder="Enter discount percent"
                            defaultValue="0"
                        />
                    </div>
                }

                <ManualInput 
                    field="richText"
                    fieldLabel="Product description"
                    name="detail"
                />

            </ManualForm>
        </div>
    )
}

export default ProductForm