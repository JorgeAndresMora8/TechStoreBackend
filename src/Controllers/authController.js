import createToken from "../utils/createToken.js";
import loginValidation from "../utils/loginValidation.js";
import SendResponse from "../utils/sendResponse.js";
import signUpValidation from "../utils/signupValidation.js";

export async function login(req, res){ 

    try{ 
    const user = await loginValidation(req.body)
    const token = await createToken(req.body)
    SendResponse(res, 200, {user: user, token: token, admin: false})
    } catch(error){ 
    SendResponse(res, 401, {error: error.message})
    }

}

export async function signup(req, res){ 

    try{ 
        const user = req.body
        console.log(user)
        await signUpValidation(user)
        const token = await createToken(user); 
        SendResponse(res, 201, {user: user, token: token})
    }catch(error){ 
        SendResponse(res, 401, {error: error.message})
    }

    // res.status(400).json({error: "something went wrong"})

     
}

export function logout(req, res){ 
    res.send('logout')
}