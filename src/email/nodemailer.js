import nodemailer from "nodemailer";
import { ADMIN_EMAIL_ENV, SECRET_PASS_GOOGLE_ENV } from "../envData/Env.js";
import ejs from "ejs";



let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: ADMIN_EMAIL_ENV,
    pass: SECRET_PASS_GOOGLE_ENV,
  },
});

export async function sendEmail({email, products, total}) {
  const emailTemplate = await ejs.renderFile("./src/email/template.ejs", {
    products: products,
    total: total,
  });

  await transporter.sendMail({
    from: "Tech Store",
    to: ADMIN_EMAIL_ENV,
    subject: "Purchase Success Confirmation Email",
    html: emailTemplate,
  });

  await transporter.sendMail({
    from: "Tech Store",
    to: email,
    subject: "Purchase Success Confirmation Email",
    html: emailTemplate,
  });
}
