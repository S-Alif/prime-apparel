import asyncHandler from './asyncHandler.js'

const  controllerHandler = (service, model = null) => {

    return asyncHandler(async (req, res) => {
        const result = model ? service(req, model) : await service(req)
        res.status(200).json(result)
    })
}
export default controllerHandler