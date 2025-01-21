import productSpecStore from "@/stores/productSpecStore"
import ManualForm from "../manual-form/ManualForm"
import ManualInput from "../manual-form/ManualInput"


const ProductForm = ({ data = {}, updating = false }) => {

    const {category, colors} = productSpecStore()

    let defaultValues = {
        name: "",
        detail: "",
        price: "0",
        category: "",
        color: ""
    }
    
    // if updating then add the updating data to default value
    if(updating && Object.keys(data).length > 0) {
        defaultValues = {...data}
    }

    // submit update or add product
    const formSubmit = async (e) => {
        console.log(e)
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