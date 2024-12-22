import nodemailer from "nodemailer";

async function sendEmail(to, subject, text) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_EMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: `"Rashid Khan <${process.env.SMTP_EMAIL}>"`,
    to: to,
    subject: subject,
    text: text,
  };

  let info = await transporter.sendMail(mailOptions);

  return res
    .status(200)
    .json(
      new apiResponse(200, { info }, "Password reset link sent successfully")
    );
}

export default sendEmail;
