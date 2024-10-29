import { Router } from "express";
import { sendEmail } from "../email/nodemailer.js";


export const paymentRouter = Router()

paymentRouter.post("/", async (req, res) => {

  try {
    await sendEmail(
      { 
        email: req.body['email'], 
        products: req.body['products'], 
        total: req.body['total'],
      }
      
     )
     res.status(200).json({message: true})
  } catch (error) {
    res.status(400).json({message: false})
  }
    
});