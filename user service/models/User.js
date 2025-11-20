import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    name: { String, required: true },
    email: { String, required: true, unique: true },
    password: { String, required: true },
    role: { String, required: true },
    playlist: [
        { String, required: true }
    ],
}, { timestamps: true })

export default model('User', userSchema)