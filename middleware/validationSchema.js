const {body} = require('express-validator')

const validationSchema = ()=>{
    return [
        
            body('answer')
                .notEmpty()
                .withMessage('answer is required')
                .isLength({min:1}), 
        
        
    ]
}

module.exports = {
    validationSchema
}