import { Schema, model } from "mongoose";

const userSchema = new Schema({ 
    id: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true}, 
    email: {type: String, required: true},
    password: {type: String, required: true},
})

export const userModel = new model('user', userSchema)