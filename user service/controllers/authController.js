import Joi from "joi";
import TryCatch from "../utils/TryCatch.js";
import CustomErrorHandler from "../utils/CustomErrorHandler.js";
import User from "../models/User.js";
import bcrypt from 'bcrypt'
import JwtService from "../utils/JwtService.js";

const authController = {
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



    }),

    loginUser: TryCatch(async (req, res, next) => {
        res.status(200).json({ message: "Login logic goes here" });
    }),
};

export default authController;