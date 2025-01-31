import {apiError} from '../helpers/apiError.helper.js'

const fileChecker = (allowedType = [], fileLimit) => {
    return async (req, res, next) => {
        try {
            let files = req.files
            
            if (!files || Object.keys(files).length === 0) {
                if (fileLimit === 0) {
                    return next()
                }
                return next()
            }

            const imageFileSize = 5 * 1024 * 1024
            const videoFileSize = 5 * 1024 * 1024

            const uploadingImages = Object.values(req.files).flat()

            if(fileLimit > 0 && uploadingImages.length > fileLimit) throw new apiError(400, `Cannot upload more than ${fileLimit} images or videos`)

            // Check file size and type
            uploadingImages.flatMap(file => {
                if (!allowedType.includes(file?.mimetype)) {
                    throw new apiError(400, "Invalid file types")
                }
                else {
                    const sizeLimit = file?.mimetype == "video/mp4" ? videoFileSize : imageFileSize
                    if (file.size > sizeLimit) {
                        throw new apiError(400, `File size should be less than ${sizeLimit / (1024 * 1024)} MB`)
                    }
                }
            })

            next()
        } catch (error) {
            next(error)
        }
    }
}

export default fileChecker