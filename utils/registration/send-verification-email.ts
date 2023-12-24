import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface IProps {
  otp: string;
  emailAddress: string;
  tempUserId: string;
}

export async function sendVerificationEmail({
  otp,
  emailAddress,
  tempUserId,
}: IProps) {
  const response = await resend.emails.send({
    from: "Navin's Verification Bot <naviava.verify@fondingo.com>",
    to: [emailAddress],
    subject: "Verify your email",
    text: `\nYour OTP is ${otp}.\n\nAlternatively, you can click this link to verify your email: http://localhost:3000/register/${tempUserId}\n\n\nIf you did not request this email, please ignore it.`,
    reply_to: "naviava.verify@gmail.com",
  });
  return response;
}
