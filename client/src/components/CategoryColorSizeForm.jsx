import { useRef } from "react"
import ManualForm from "./manual-form/ManualForm"
import { adminRoutes, patchMethod, postMethod } from "@/constants/apiConstants"
import productSpecStore from "@/stores/productSpecStore"
import apiHandler from "@/api/apiHandler"
import { failToast, successToast } from "@/helpers/toasts"
import ManualInput from "./manual-form/ManualInput"


const CategoryColorSizeForm = ({
    generateForm = "category", 
    data = {}, 
    updating = false 
}) => {

    const { addCategories, updateCategories, addColors, updateColors, addSizes, updateSizes } = productSpecStore()
    const formRef = useRef(null)

    // set default values
    let defaultValue = {
        name: ""
    }
    if(generateForm == "colors") defaultValue.colorValue = ""

    // set urls
    let url = adminRoutes.category
    if(generateForm == "colors") url = adminRoutes.colors
    if(generateForm == "sizes") url = adminRoutes.sizes

    // change for updates
    if (updating) {
        url = `${url}/${data?._id}`
        defaultValue = data
    }

    // submit form
    const formSubmit = async (e) => {
        if(e.name.trim() == "" || e.name.trim().length < 3){
            return failToast("Name should be at least 3 characters")
        }

        let result = await apiHandler(url, updating ? patchMethod : postMethod, e)
        if(!result) return
        successToast(`${generateForm} saved`)
        formRef.current.resetForm()

        // add or update
        if(updating){
            if (generateForm == "category") return updateCategories(result.data)
            if (generateForm == "colors") return updateColors(result.data)
            return updateSizes(result.data)
        }
        
        if(generateForm == "category") return addCategories(result.data)
        if(generateForm == "colors") return addColors(result.data)
        return addSizes(result.data)
    }



    return (
        <div className="w-[500px] h-auto max-w-[calc(100%)] p-10 rounded-lg bg-white shadow">
            <ManualForm
                formId={`${generateForm}-form`}
                buttonText="Save"
                buttonSize="lg"
                onSubmit={formSubmit}
                ref={formRef}
                defaultValues={defaultValue}
            >
                <ManualInput 
                    field="input"
                    fieldType="text"
                    fieldLabel={`${generateForm} name`}
                    name="name"
                    placeholder={`Enter ${generateForm} name`}
                />

                {/* {
                    generateForm == "colors" && <></>
                } */}

            </ManualForm>
        </div>
    )
}

export default CategoryColorSizeForm