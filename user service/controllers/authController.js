import Joi from "joi";
import TryCatch from "../utils/TryCatch.js";
import CustomErrorHandler from "../utils/CustomErrorHandler.js";
import User from "../models/User.js";
import bcrypt from 'bcrypt'
import JwtService from "../utils/JwtService.js";
import { STATUS_CREATED, STATUS_OK } from "../configs/index.js";

const authController = {
    // =============== register =========
    registerUser: TryCatch(async (req, res, next) => {
        //validate
        const schema = Joi.object({
            name: Joi.string().min(2).max(50).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(2).max(50).required(),
        });

        const { error, value } = schema.validate(req.body);
        if (error) return next(error);

        // Verify
        let user = await User.findOne({ email: value.email });
        if (user) return next(CustomErrorHandler.AlreadyExists());

        // hash password 
        const password = await bcrypt.hash(value.password, 10);

        // Add User in DB
        const { name, email } = value;
        user = await User.create({ name, email, password })

        // create token
        const token = JwtService.sign({ _id: user._id })
        let data = {
            token,
            message: "User register success",
            success: true
        }

        res.status(STATUS_CREATED).json(data)

    }),

    // =========== Login ========

    loginUser: TryCatch(async (req, res, next) => {
        //validate
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(2).max(50).required(),
        });
        const { error, value } = schema.validate(req.body);
        if (error) return next(error);
        const { email, password } = value;

        // Verify
        let user = await User.findOne({ email });
        if (!user) return next(CustomErrorHandler.NotFound("User not register"));

        // comparing password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) { return next(CustomErrorHandler.Invalid("Invalid Creadential")) }

        // creat token 
        const token = JwtService.sign({ _id: user._id });

        res.status(STATUS_OK).json({ message: "Login success", success: true, token })

    }),

    // ====== verify profile using token
    userProfile: TryCatch(async (req, res, next) => {
        const user = req.user;
        if (!user) {
            return next(CustomErrorHandler.UnAuthorized("Please login."))
        }

        res.status(STATUS_OK).json(user)
    })
};

export default authController;