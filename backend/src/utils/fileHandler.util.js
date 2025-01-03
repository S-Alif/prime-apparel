import axios from "axios"
import { apiError } from "../helpers/apiError.helper.js"
import FormData from "form-data"


const uploadProductImage = async (fileArray) => {
    try {        
        const uploadPromise = fileArray.map(async (file) => {
            const formData = new FormData()

            formData.append("image", file.data, {
                filename: file.name,
                contentType: file.mimetype
            })

            const result = await axios.post(
                `https://api.imgbb.com/1/upload?key=${process.env.IMG_API_KEY}`,
                formData,
                {
                    headers: formData.getHeaders()
                }
            )

            const { display_url, delete_url } = result.data?.data
            return{
                url: display_url,
                deletUrl: delete_url
            }
        })

        const uploadedImageUrls = await Promise.all(uploadPromise) // will contain objects with image display url and delete url

        return uploadedImageUrls

    } catch (error) {
        throw new apiError(400, "Error uploading product images")
    }
}

export {uploadProductImage}