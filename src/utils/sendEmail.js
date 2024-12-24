import nodemailer from "nodemailer";

async function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Rashid Khan ${process.env.SMTP_EMAIL}"`,
    to: to,
    subject: subject,
    text: text,
  };

  const info = await transporter.sendMail(mailOptions);

  return info;
}

export default sendEmail;
