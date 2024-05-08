import jwt from "jsonwebtoken"

export default async function createToken(data){ 
    const { email } = data
    const token = await jwt.sign({email: email}, 'SECRET_WORD', { expiresIn:60*60*25 })
    return token
}