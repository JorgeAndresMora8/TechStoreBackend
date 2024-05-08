import { UserDAO } from "../DB/DAO.js";
import Validation from "../Logic/Auth/Validation.js";

export async function getUsers(req, res){ 
    const userList = await UserDAO.get_all()
    res.status(200).json(userList)
}

export async function updateUser(req, res){ 
    if(!Validation(req.body)){ 
        res.status(401).json({message: "some fields missings"})
        return; 
    }

    await UserDAO.update(req.body.id, req.body)
    res.status(200).json({message: "user updated succesfully"})
}

export async function deleteUser(req, res){ 
    await UserDAO.delete(req.params.id)
    res.status(201).json({message: "user deleted succesfully"})
}