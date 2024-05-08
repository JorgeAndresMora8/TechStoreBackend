export default function Validation(user){ 
    
    let isOk = true
    const { firstname, lastname, email, password } = user

    if(!firstname || !lastname || !email || !password) isOk = false
    
    return isOk
}