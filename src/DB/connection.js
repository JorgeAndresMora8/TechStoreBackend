import mongoose from 'mongoose';

export default function DBConnection(URI){ 
    try{ 
        mongoose.connect(URI)
    }catch(error){ 
        setTimeout(() => {
            DBConnection(URI)
        }, 5000);
    }
}