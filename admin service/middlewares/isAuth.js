import CustomErrorHandler from "../utils/CustomErrorHandler.js";
import TryCatch from "../utils/TryCatch.js";
import axios from 'axios'

const isAuth = TryCatch(async (req, res, next) => {
    const token = req.headers.token;

    if (!token) { return next(CustomErrorHandler.UnAuthorized("Please login")) }

    // here checking user role and auth
    const { data } = await axios.get(`${USER_URL}/api/auth/me`, {
        headers: {
            token,
        }
    })

    req.user = data;
    next();
})

export default isAuth