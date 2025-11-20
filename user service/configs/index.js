import { config } from 'dotenv'
config();

export const { PORT, DUBUG_MODE, MONGODB_URL, JWT_SECRECT, JWT_EXPIRY } = process.env;

// ------- STATUS CODE 
export const STATUS_OK = 200;
export const STATUS_CREATED = 201;
export const STATUS_BAD_REQUEST = 400;
export const STATUS_UNAUTHORIZED = 401;
export const STATUS_CONFLICT = 409;
export const STATUS_NOTFOUND = 404;
export const STATUS_UNPROCESSABLE_ENTITY = 422;
export const STATUS_INTERNAL_SERVER_ERROR = 500;