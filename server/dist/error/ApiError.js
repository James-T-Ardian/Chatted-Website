"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
// ApiError class is to simplify error handling by putting the most important
// information about an error unto a single object.
class ApiError {
    // Parameters: - code (int): HTTP error code
    //             - message (string) : Error message
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
}
exports.ApiError = ApiError;
// Parameters: - message (string) : Error message
//      
// Return: ApiError object that captures the important information about badRequest errors    
ApiError.badRequest = (message) => {
    return new ApiError(400, message);
};
// Parameters: - message (string) : Error message
//      
// Return: ApiError object that captures the important information about internal errors   
ApiError.internalError = (message = "Server has encountered an internal error. Please contact administrator at jamesardian01@gmail.com and inform them.") => {
    return new ApiError(500, message);
};
// Parameters: - message (string) : Error message
//      
// Return: ApiError object that captures the important information about resource not found errors    
ApiError.resourceNotFound = (message) => {
    return new ApiError(404, message);
};
// Parameters: - message (string) : Error message
//      
// Return: ApiError object that captures the important information about resource conflict errors
ApiError.conflict = (message) => {
    return new ApiError(409, message);
};
