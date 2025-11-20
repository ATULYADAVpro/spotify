import User from "../models/User.js";
import CustomErrorHandler from "../utils/CustomErrorHandler.js";
import JwtService from "../utils/JwtService.js";
import TryCatch from "../utils/TryCatch.js";

const isAuth = TryCatch(async (req, res, next) => {
    const token = req.headers.token;
    if (!token) { return next(CustomErrorHandler.UnAuthorized("token not found login please")) }

    // decode jwt 
    const decode = JwtService.verify(token)
    if (!decode || !decode._id) { return next(CustomErrorHandler.UnAuthorized("Token expriy re-login")) }

    // Verify and fetch user data
    const user = await User.findById(decode._id).select('-password')

    if (!user) { return next(CustomErrorHandler.NotFound("User not found.")) }


    // store in req user id
    req.user = user;
    next();
})

export default isAuth