import { UserDAO } from "../DB/DAO.js";
import createId from "./createId.js";
import { encryptPassword } from "./hashPassword.js";

export default async function signUpValidation(data){ 
    const { firstname, lastname, email, password } = data;

    if(!firstname || !lastname || !email || !password){ 
        throw new Error('Some fields missing, please check again')
    }

    const userDB = await UserDAO.get_by_email(email)
    if(userDB){ 
        throw new Error('This user already exits, please try again')
    }

    let newPassword = await encryptPassword(password); 
    const id = createId()
    data['password'] = newPassword
    data['id'] = id
    await UserDAO.create(data); 

}
