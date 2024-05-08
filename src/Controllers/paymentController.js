import { Router } from "express";
import { sendEmail } from "../email/nodemailer.js";


export const paymentRouter = Router()

paymentRouter.post("/", async (req, res) => {


  // try {
  //   await sendEmail(
  //     { 
  //       email: 'jorgeandresmm2002@gmail.com', 
  //       products: req.body['products'], 
  //       total: req.body['total'],
  //     }
  //    )
  // } catch (error) {
  //   res.status(400).json({message: false})
  // }
  //   res.status(200).json({message: true})

  res.status(400).json({error: "something went wrong"})
  


});