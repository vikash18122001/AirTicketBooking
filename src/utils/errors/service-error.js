const {StatusCodes}=require('http-status-codes')

class ServiceErrors extends Error{
    constructor(
      
        message='something went wrong',
        explanation='service layer error',
        StatusCode=StatusCodes.INTERNAL_SERVER_ERROR
    ){
      super();
        this.name='service error',
        this.message=message,
        this.explanation=explanation,
        this.StatusCode=StatusCode
    }
    
    
}
module.exports=ServiceErrors;