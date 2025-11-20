import { STATUS_BAD_REQUEST, STATUS_CONFLICT, STATUS_NOTFOUND, STATUS_UNAUTHORIZED } from "../configs/index.js";

class CustomErrorHandler extends Error {
    constructor(status, msg) {
        super();
        this.status = status;
        this.message = msg;
        this.success = false;
    }

    static AllFiledRequired(message = 'All filed are required.') {
        return new CustomErrorHandler(STATUS_BAD_REQUEST, message)
    }

    static UnAuthorized(message = "Unauthorize user") {
        return new CustomErrorHandler(STATUS_UNAUTHORIZED, message)
    }

    static AlreadyExists(message = "User already exists") {
        return new CustomErrorHandler(STATUS_CONFLICT, message)
    }

    static NotFound(message = 'Resource not found') {
        return new CustomErrorHandler(STATUS_NOTFOUND, message)
    }

    static Invalid(message = "Invalid check your details") {
        return new CustomErrorHandler(STATUS_BAD_REQUEST, message)
    }
}

export default CustomErrorHandler;