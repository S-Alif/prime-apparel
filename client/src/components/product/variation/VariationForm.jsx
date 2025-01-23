import apiHandler from '@/api/apiHandler'
import ManualForm from '@/components/manual-form/ManualForm'
import ManualInput from '@/components/manual-form/ManualInput'
import { adminRoutes, patchMethod, postMethod } from '@/constants/apiConstants'
import { successToast } from '@/helpers/toasts'
import productSpecStore from '@/stores/productSpecStore'

const VariationForm = ({ 
    data = {},
    updating = false,
    returnData,
    productId = ""
}) => {

    const {sizes} = productSpecStore()
    let url = adminRoutes.productVariation

    let defaultValues = {
        productId: productId,
        size: "",
        stock: "0"
    }

    if(updating) {
        defaultValues = {
            size: data?.size?._id || "",
            stock: data?.stock? data?.stock?.toString() : "0",
            productId: productId,
        }
        url = `${url}/${data?._id}/${productId}`
    }

    // submit form
    const formSubmit = async (e) => {
        let result = await apiHandler(url, updating ? patchMethod : postMethod, e)
        if(!result) return
        returnData(result?.data)
        successToast(`${updating? "Variation updated" : "Variation added"} successfully`)
    }

    return (
        <div>
            <ManualForm
                formId={`variation ${updating ? "update" : "add"} form`}
                buttonText={`${updating ? "Update" : "Add"} variation`}
                buttonSize="lg"
                onSubmit={formSubmit}
                defaultValues={defaultValues}
            >
                {
                    !updating &&
                    <ManualInput
                        field="select"
                        fieldLabel="Select product size"
                        name="size"
                        selectValues={sizes}
                        placeholder="Select size"
                    />
                }

                <ManualInput
                    field="input"
                    fieldType="text"
                    fieldLabel="Product stock"
                    name="stock"
                    placeholder="Stock amount"
                />

            </ManualForm>
        </div>
    )
}

export default VariationForm