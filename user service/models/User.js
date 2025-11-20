import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "user" },
    playlist: [
        { type: String, required: true }
    ],
}, { timestamps: true });

export default model('User', userSchema);