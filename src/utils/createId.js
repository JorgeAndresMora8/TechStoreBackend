import { v4 as uuidv4 } from 'uuid';


export default function createId(){ 
    let newId = uuidv4()
    return newId
}