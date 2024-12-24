import asyncHandler from './asyncHandler.js'

const  controllerHandler = (service, model = null, ...params) => {

    return asyncHandler(async (req, res) => {

        const result = model ? await service(req, model, ...params) : await service(req)

        res.status(200).json(result)
    })
}
export default controllerHandler