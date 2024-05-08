import { Schema, model } from "mongoose";

const reviewSchema = new Schema({ 
    id: { type: String, required: true }, 
    userId: { type: String, required: true },
    rating: { type: Number, required: true }, 
    comment: { type: String, required: true}, 
    productId: { type: String, required: true }, 
    createdAt: { type: String, required: true },
})

export const reviewModel = new model('review', reviewSchema)