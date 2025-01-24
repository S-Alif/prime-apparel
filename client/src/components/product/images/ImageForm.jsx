import apiHandler from "@/api/apiHandler"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { adminRoutes, postMethod } from "@/constants/apiConstants"
import { failToast, successToast } from "@/helpers/toasts"
import { useRef } from "react"


const ImageForm = ({productId = "", returnData}) => {

    const formRef = useRef(null)

    // check images size and types
    const fileChecker = (files) => {
        if(files.length == 0 || files.length > 5) return failToast("Please select upto five images")

        const allowedFileTypes = ["image/jpeg", "image/png"]

        for(let i = 0; i < files.length; i++){
            if(!allowedFileTypes.includes(files[i].type)){
                failToast("Invalid file format. Only jpg and png are allowed")
                return false
            }
            if(files[i].size > 5 * 1024 * 1024) {
                failToast("File size should not exceed 5MB")
                return false
            }
        }
        return true
    }

    // submit form
    const formSubmit = async (e) => {
        e.preventDefault()
        let files = e.target.images.files
        
        let validate = fileChecker(files)
        if(!validate) return

        const formData = new FormData()
        for (let i = 0; i < files.length; i++) {
            formData.append(`files[]`, files[i])
        }

        let result = await apiHandler(`${adminRoutes.productImage}/${productId}`, postMethod, formData)
        if(!result) return
        returnData(result?.data)
        successToast("Images uploaded successfully")
        formRef.current.reset()
    }

    return (
        <div>
            <form id="image-form" onSubmit={formSubmit} ref={formRef}>
                <div className="mb-4 lg:mb-8">
                    <p className="text-[18px] pb-3 capitalize">Select images <span className="text-gray-400">(upto 5 images)</span></p>
                    <Input
                        type="file"
                        name="images"
                        id="image-input-field"
                        className="h-12 !text-[17px]"
                        multiple={true}
                        accept=".jpg,.jpeg,.png"
                    />
                </div>

                <Button type="submit" size="lg">Add image</Button>
            </form>
        </div>
    )
}

export default ImageForm