import { DEBUG, STATUS_INTERNAL_SERVER_ERROR } from "../configs/index.js";

export default async function GlobalErrorHandler(err, req, res, next) {
    let statusCode = STATUS_INTERNAL_SERVER_ERROR;
    let data = {
        message: "Internal Server Error. ",
        success: false,
        ...(DEBUG === 'true' && { originalError: err.message })
    }

    return res.status(statusCode).json(data)

}