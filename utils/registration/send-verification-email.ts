// import nodemailer from "nodemailer";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendVerificationEmail = async (
  tempUserId: string,
  email: string,
  otp: string,
) => {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: "naviava.verify@gmail.com",
    subject: "Verify your email",
    html: `<p>Use this OTP to verify your email: ${otp}</p><br /><p>Alternatively, follow <a href="http://localhost:3000/register/${tempUserId}">this link</a> to verify your email.</p>`,
  };

  return transporter.sendMail(mailOptions);
};

sendVerificationEmail("TEMP_USER_ID", "EMAIL", "XXXXXX");
