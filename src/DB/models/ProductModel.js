import { Schema, model } from "mongoose";

const productSchema = new Schema({ 
    id: { type: String, required: true }, 
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true}, 
    image: { type: String, required: true}, 
    rating: { type: Number, required: true }
})

export const productModel = new model('products', productSchema)