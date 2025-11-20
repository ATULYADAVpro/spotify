import { STATUS_BAD_REQUEST, STATUS_CONFLICT, STATUS_NOTFOUND, STATUS_UNAUTHORIZED } from "../configs/index.js";

class CustomErrorHandler extends Error {
    constructor(status, msg) {
        super();
        this.status = status;
        this.message = msg;
        this.success = false;
    }

    static AllFiledRequired(status = STATUS_BAD_REQUEST, message = 'All filed are required.') {
        return new CustomErrorHandler(status, message)
    }

    static UnAuthorized(status = STATUS_UNAUTHORIZED, message = "Unauthorize user") {
        return new CustomErrorHandler(status, message)
    }

    static AlreadyExists(status = STATUS_CONFLICT, message = "User already exists") {
        return new CustomErrorHandler(status, message)
    }

    static NotFound(status = STATUS_NOTFOUND, message = 'Resource not found') {
        return new CustomErrorHandler(status, message)
    }

    static Invalid(status = STATUS_BAD_REQUEST, message = "Invalid check your details") {
        return new CustomErrorHandler(status, message)
    }
}

export default CustomErrorHandler;