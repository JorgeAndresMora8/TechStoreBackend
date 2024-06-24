import jwt from "jsonwebtoken"
import { SECRET_WORD_ENV } from "../envData/Env.js"

export default async function createToken(data){ 
    const { email } = data
    const token = await jwt.sign({email: email}, SECRET_WORD_ENV, { expiresIn:60*60*25 })
    return token
}