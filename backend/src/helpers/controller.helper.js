import asyncHandler from './asyncHandler.js'

const  controllerHandler = (service) => {
    return asyncHandler(async (req, res) => {
        const result = await service(req.body)
        res.status(200).json(result)
    })
}
export default controllerHandler