import Joi from "joi";
import { DUBUG_MODE, STATUS_INTERNAL_SERVER_ERROR, STATUS_UNPROCESSABLE_ENTITY } from "../configs/index.js";
import CustomErrorHandler from "../utils/CustomErrorHandler.js";

export default function GlobalErrorHandler(err, req, res, next) {
    let statusCode = STATUS_INTERNAL_SERVER_ERROR;
    let data = {
        message: "Internal Server Error. ",
        success: false,
        ...(DUBUG_MODE === 'true' && { originalError: err.message })
    }

    // Custom Error Handler 
    if (err instanceof CustomErrorHandler) {
        statusCode = err.status
        data = {
            message: err.message,
            success: false
        }
    }

    // Joi Error Handler
    if (err instanceof Joi.ValidationError) {
        statusCode = STATUS_UNPROCESSABLE_ENTITY
        data = {
            message: err.message,
            success: false
        }
    }

    return res.status(statusCode).json(data)

}