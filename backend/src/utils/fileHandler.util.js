import axios from "axios"
import { apiError } from "../helpers/apiError.helper.js"
import FormData from "form-data"

// upload product image
const uploadProductImage = async (fileArray) => {
    try {        
        const uploadPromise = fileArray.map(async (file) => {
            const formData = new FormData()

            formData.append("source", file.data, {
                filename: file.name,
                contentType: file.mimetype
            })
            formData.append("key", process.env.IMG_API_KEY)
            formData.append("action", "upload")
            formData.append("format", "json")

            const result = await axios.post(
                `https://freeimage.host/api/1/upload?key=${process.env.IMG_API_KEY}`,
                formData,
                {
                    headers: formData.getHeaders()
                }
            )

            const { url } = result.data?.image
            return{
                url: url
            }
        })

        const uploadedImageUrls = await Promise.all(uploadPromise) // will contain objects with image display url and delete url

        return uploadedImageUrls

    } catch (error) {
        console.log(error)
        console.log(error?.response?.data)
        throw new apiError(400, "Error uploading product images")
    }
}

export {uploadProductImage}