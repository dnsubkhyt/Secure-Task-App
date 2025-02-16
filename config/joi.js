const Joi = require('joi')

const validateUserSchema = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string()
            .min(10)
            .max(20)
            .pattern(/^(?=.*[A-Z])/, 'uppercase letter')
            .pattern(/^(?=.*[0-9])/, 'number')
            .required(),
        role: Joi.string().valid('user', 'admin').required()
    })
    return schema.validate(user)
}

const validateTaskSchema = (task) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required().min(10).max(1000),
        status: Joi.string().valid('pending', 'completed').required(), 
        userId: Joi.string().required()
    })
    return schema.validate(task)
}


module.exports = {validateUserSchema, validateTaskSchema}