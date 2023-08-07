const AppErrors=require('./error-handler');
const {StatusCodes}=require('http-status-codes');
class ValidationError extends Errors{
    constructor(error){
       super();
        let explanation=[];
        error.errors.forEach((err)=>{
            explanation.push(err.message);
        })
        this.name='validationError',
        this.message='not able to validate the data sent in the request',
        this.explanation=explanation,
        this.statusCode=StatusCodes.BAD_REQUEST
    }
}
module.exports=ValidationError;