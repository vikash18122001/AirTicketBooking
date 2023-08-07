class AppError extends Error {
    constructor(
        name,
        explanation,
        message,
        statusCode
    ){
        super();
        this.name=name,
        this.explanation=explanation,
        this.message=message,
        this.statusCode=statusCode
    }
}
module.exports=AppError;