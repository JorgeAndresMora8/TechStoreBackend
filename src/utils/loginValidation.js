import { UserDAO } from "../DB/DAO.js";
import { comparePassword } from "./hashPassword.js";

export default async function loginValidation(data){ 
    const { email, password } = data; 
    if(!email || !password) throw new Error('No email OR password provided'); 
    const userDB = await UserDAO.get_by_email(email); 
    if(!userDB) throw new Error('User not found');

    let compareResult = await comparePassword(password, userDB['password'])
    if(!compareResult) throw new Error('Incorrect Password') 
    return userDB
}