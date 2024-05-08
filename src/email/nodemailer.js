import nodemailer from "nodemailer";
import { ADMIN_EMAIL_ENV } from "../env/Env.js";
import ejs from "ejs";
// import path from "path"

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "jorgeandresmm2002@gmail.com",
    pass: "qxvm wthq taxs dojp",
  },
});

export async function sendEmail({email, products, total}) {
  await transporter.sendMail({
    from: "Food Market",
    to: "jamm08012002@gmail.com",
    subject: "Purchase",
    html: `<h1>Hello ${email}</h1>
              <h2>Your purchase is on its way.</h2>
              <p>Thanks for be a part of this family</p>
              <b>TOTAL: ${total}</b>`,
  });

  const emailTemplate = await ejs.renderFile("./src/email/template.ejs", {
    products: products,
    total: total,
  });

  await transporter.sendMail({
    from: "Food Market",
    to: 'jorgeandresmm2002@gmail.com',
    subject: "Purchase",
    html: emailTemplate,
  });
}
