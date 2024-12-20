import Joi from 'joi'

const validatorHandler = (schema) => {
    return Joi.object(schema)
}

const validator = {
    signup: validatorHandler({
        fName: Joi.string().max(50).min(2).required(),
        lName: Joi.string().max(50).min(2).required(),
        email: Joi.string().email().pattern(new RegExp('^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|icloud\.com)$')).required().required(),
        pass: Joi.string().min(8).required()
    }),

    login: Joi.object({
        email: Joi.string().email().pattern(new RegExp('^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|icloud\.com)$')).required(),
        pass: Joi.string().required().min(8).required(),
    }),


}

export default validator

export const isValidData = (validatorMthod, data) => {
    if(data == null || data == undefined) return false
    const validateData = validatorMthod.validate(data)
    if (validateData?.error) return false
    return true
}
