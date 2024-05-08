import { mongo } from 'mongoose';
import connectionDB from './connection.js'
import { productModel } from './models/ProductModel.js';
import { reviewModel } from './models/ReviewModel.js';
import { userModel } from './models/UserModel.js';

connectionDB('mongodb+srv://jorgeandresmm2002:jorgemora2002@cluster0.s6i7i0p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

export default class Container { 
    constructor(schema){ 
        this.schema = schema; 
    }

    async create(data){ 
        await this.schema.create(data); 
    }

    async get_by_params(params){ 

        let mongoDbParams = []

        if(params.name !== "" ) mongoDbParams.push( { $text: { $search: params.name } })
        if(params.price !== "0") mongoDbParams.push({ price: {$lt: params.price} })
        if(params.brand !== "") mongoDbParams.push({ brand: params.brand })
        if(params.category !== "") mongoDbParams.push({ category: params.category })
        
        console.log(params)
        console.log(mongoDbParams)

        if(mongoDbParams.length >= 1){
        const response = await this.schema.find({$and: mongoDbParams})
        return response
        }else { 
            const response = await this.schema.find({}, {_id: 0, __v: 0}).lean();
            return response
        }
        
    }

    async get_all(){ 
        return await this.schema.find({}, {_id: 0, __v: 0}).lean();
    }

    async get_by_id(id){ 
        const data = await this.schema.findOne({id: id}, {_id: 0, __v: 0})
        return data
    }

    async get_by_email(email){ 
        const data = await this.schema.findOne({email: email}, {_id: 0, __v: 0})
        return data 
    }

    async update(id, data){ 
        const { name, description, stock, price, rating } = data
        await this.schema.updateOne({id:id}, {$set:{name, price, stock, description, rating}})
    }

    async delete(id){ 
        await this.schema.deleteOne({id: id})
    }
}

export const ProductDAO = new Container(productModel)
export const ReviewDAO = new Container(reviewModel)
export const UserDAO = new Container(userModel)