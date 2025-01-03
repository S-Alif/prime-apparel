import {apiError} from '../helpers/apiError.helper.js'

const fileChecker = (allowedType = []) => {
    return async (req, res, next) => {
        let files = req.files
        if (!files) throw new apiError(400, "Please upload a file")
        
        const imageFileSize = 3 * 1024 * 1024
        const videoFileSize = 5 * 1024 * 1024
        
        Object.values(files).flat().forEach(file => {
            if(!allowedType.includes(file?.mimeType)){
                throw new apiError(400, "Invalid file types")
            }
            else{
                const sizeLimit = file?.mimeType == "video/mp4" ? videoFileSize : imageFileSize
                if(file.size > sizeLimit){
                    throw new apiError(400, `File size should be less than ${sizeLimit / (1024 * 1024)} MB`)
                }
            }
        })

        next()
    }
}

export default fileChecker