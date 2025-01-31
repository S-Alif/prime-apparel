import { useEffect, useRef, useState } from "react"
import ManualForm from "../manual-form/ManualForm"
import { adminRoutes, patchMethod, postMethod } from "@/constants/apiConstants"
import productSpecStore from "@/stores/productSpecStore"
import apiHandler from "@/api/apiHandler"
import { failToast, successToast } from "@/helpers/toasts"
import ManualInput from "../manual-form/ManualInput"
import { Input } from "../ui/input"


const CategoryColorSizeForm = ({
    generateForm = "category", 
    data = {}, 
    updating = false 
}) => {

    const { addCategories, updateCategories, addColors, updateColors, addSizes, updateSizes } = productSpecStore()
    const formRef = useRef(null)

    // setting default value
    let defaultValueObj = { 
        name: "",
        // ...(generateForm === "category" && { images: "" }),
        ...(generateForm === "color" && { colorValue: "" }) 
    }
    const [defaultValue, setDefaultValue] = useState(defaultValueObj)

    // updating default value with update signal
    useEffect(() => {
        if (updating && data) {
            setDefaultValue({
                name: data?.name || "",
                ...(generateForm === "color" && { colorValue: data?.colorValue || "" }),
            })
        }
    }, [updating, data, generateForm])


    // set urls
    let url = adminRoutes.category
    if(generateForm == "color") url = adminRoutes.colors
    if(generateForm == "sizes") url = adminRoutes.sizes

    // change for updates
    if (updating) {
        url = `${url}/${data?._id}`
    }

    // check images size and types
    const fileChecker = (files) => {
        if (!files || files.length == 0 || files.length > 1) return failToast("Please select upto one images")

        const allowedFileTypes = ["image/jpeg", "image/png"]

        for (let i = 0; i < files.length; i++) {
            if (!allowedFileTypes.includes(files[i].type)) {
                failToast("Invalid file format. Only jpg and png are allowed")
                return false
            }
            if (files[i].size > 5 * 1024 * 1024) {
                failToast("File size should not exceed 5MB")
                return false
            }
        }
        return true
    }

    // submit form
    const formSubmit = async (e) => {
        if(generateForm == "sizes" && e.name.trim().length < 1) return failToast("Name should be at least 1 characters")
        if (generateForm != "sizes" && e.name.trim().length < 3){
            return failToast("Name should be at least 3 characters")
        }
        
        let formData = new FormData()

        if(generateForm == "category"){
            if(!fileChecker(e.images)) return
            formData.append("files[]", e.images[0])
            formData.append("name", e.name)
        }


        let result = await apiHandler(
            url,
            updating ? patchMethod : postMethod, 
            generateForm == "category" ? formData : e
        )
        if(!result) return
        successToast(`${generateForm} saved`)
        formRef.current.resetForm()
        setDefaultValue(defaultValueObj)

        // add or update
        if(updating){
            if (generateForm == "category") return updateCategories(result.data)
            if (generateForm == "color") return updateColors(result.data)
            return updateSizes(result.data)
        }
        
        if(generateForm == "category") return addCategories([result.data])
        if(generateForm == "color") return addColors([result.data])
        return addSizes([result.data])
    }



    return (
        <div className="">
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

                {
                    generateForm == "category" &&
                    <ManualInput
                        field="input"
                        fieldType="file"
                        fieldLabel={`${generateForm} image`}
                        name="images"
                        placeholder={`Enter ${generateForm} name`}
                    />
                }

                {
                    generateForm == "color" &&
                    <ManualInput 
                        field="input"
                        fieldType="color"
                        fieldLabel={`${generateForm} value`}
                        name="colorValue"
                        placeholder={`Enter ${generateForm} value`}
                    />
                }

            </ManualForm>
        </div>
    )
}

export default CategoryColorSizeForm