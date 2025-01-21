import Joi from 'joi'

const validatorHandler = (schema) => {
    return Joi.object(schema)
}

export const isValidData = (validatorMthod, data) => {
    if (data == null || data == undefined) return false
    const validateData = validatorMthod.validate(data)
    if (validateData?.error) return false
    return true
}

const validator = {

    // signup schema
    signup: validatorHandler({
        fName: Joi.string().max(50).min(2).required(),
        lName: Joi.string().max(50).min(2).required(),
        email: Joi.string().email().pattern(new RegExp('^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|icloud\.com)$')).required().required(),
        pass: Joi.string().min(8).required(),
        role: Joi.number().optional()
    }),

    // login schema
    login: Joi.object({
        email: Joi.string().email().pattern(new RegExp('^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|icloud\.com)$')).required(),
        pass: Joi.string().required().min(8).required(),
    }),

    // otp verify schema
    verifyOtp: Joi.object({
        email: Joi.string().email().pattern(new RegExp('^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|icloud\.com)$')).required(),
        otpCode: Joi.string().required().length(6),
        type: Joi.number().optional()
    }),

    // color data schema
    colorData: Joi.object({
        name: Joi.string().min(2).max(20).required(), 
        colorValue: Joi.string().min(3).max(20).required(), 
    }),

    // category and size schema
    categoryAndSize: Joi.object({
        name: Joi.string().min(2).max(20).required(), 
    }),

    // product add schema
    productAddSchema: Joi.object({
        name: Joi.string().min(2).max(100).required(),
        detail: Joi.string().min(2).max(5000).required(),
        price: Joi.number().greater(1).required(),
        category: Joi.string().min(24).max(24).required(),
        color: Joi.string().min(24).max(24).required(),
        createdAt: Joi.string().optional(),
        updatedAt: Joi.string().optional(),
    }),

    // product variation schema
    productVariation: Joi.object({
        productId: Joi.string().min(24).max(24).required(),
        size: Joi.string().min(24).max(24).required(),
        stock: Joi.number().greater(1).less(50000).required()
    })
}

export default validator