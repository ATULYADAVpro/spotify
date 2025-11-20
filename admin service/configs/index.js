import { config } from 'dotenv'
import { v2 as cloudinary } from "cloudinary";


config();

export const { PORT, DUBUG_MODE, POSTGRES_DB, JWT_SECRECT, JWT_EXPIRY, USER_URL } = process.env;

// ------- STATUS CODE 
export const STATUS_OK = 200;
export const STATUS_CREATED = 201;
export const STATUS_BAD_REQUEST = 400;
export const STATUS_UNAUTHORIZED = 401;
export const STATUS_CONFLICT = 409;
export const STATUS_NOTFOUND = 404;
export const STATUS_UNPROCESSABLE_ENTITY = 422;
export const STATUS_INTERNAL_SERVER_ERROR = 500;

// ------- Cloudinary Config -----


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary