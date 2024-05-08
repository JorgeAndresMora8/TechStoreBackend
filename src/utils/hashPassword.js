import bcrypt from "bcrypt"

const salt = 8
export async function encryptPassword(password){ 

    let newPassword; 
    await bcrypt.hash(password, salt).then((hash) => { 
        newPassword = hash
    })
    return newPassword; 
}

export async function comparePassword(plainPassword, hashedPassword){ 
    let result; 
    await bcrypt.compare(plainPassword, hashedPassword).then(function(boolean){ 
        result = boolean
    })

    return result; 
}