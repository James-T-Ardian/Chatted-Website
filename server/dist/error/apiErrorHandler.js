"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiErrorHandler = void 0;
const ApiError_1 = require("./ApiError");
// All errors from controllers will be forwarded to this function which will
// in turn send an appropriate error code and message to the user. Also handles
// cases when user sends path + method combination that is not handled by the API.
//
// This function is in the form of a NodeJS request handler. For more information regarding request handlers 
// and how NodeJS handles HTTP transfers please refer to: https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
const apiErrorHandler = (err, req, res) => {
    if (err instanceof ApiError_1.ApiError) {
        return res.status(err.code).json({ msg: err.message });
    }
    else {
        return res.status(404).json({ msg: "Resource not found" });
    }
};
exports.apiErrorHandler = apiErrorHandler;
