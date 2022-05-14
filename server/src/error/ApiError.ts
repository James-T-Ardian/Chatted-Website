// ApiError class is to simplify error handling by putting the most important
// information about an error unto a single object.
class ApiError{
    
    code:number
    message:string

    // Parameters: - code (int): HTTP error code
    //             - message (string) : Error message
    constructor(code: number, message: string){
        this.code = code
        this.message = message
    }

    // Parameters: - message (string) : Error message
    //      
    // Return: ApiError object that captures the important information about badRequest errors    
    static badRequest = (message: string): ApiError =>{
        return new ApiError(400, message)
    }

    // Parameters: - message (string) : Error message
    //      
    // Return: ApiError object that captures the important information about internal errors   
    static internalError = (message = "Server has encountered an internal error. Please contact administrator at jamesardian01@gmail.com and inform them."): ApiError =>{
        return new ApiError(500, message)
    }

    
    // Parameters: - message (string) : Error message
    //      
    // Return: ApiError object that captures the important information about resource not found errors    
    static resourceNotFound = (message: string): ApiError =>{
        return new ApiError(404, message)
    }

    // Parameters: - message (string) : Error message
    //      
    // Return: ApiError object that captures the important information about resource conflict errors
    static conflict = (message: string): ApiError =>{
        return new ApiError(409, message)
    }
}

export {ApiError}