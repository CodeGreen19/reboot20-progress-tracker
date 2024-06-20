import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_MAIL,
    pass: process.env.AUTH_PASS,
  },
});

const sendEmail = async (resetToken: string, email: string) => {
  const mailOptions = {
    from: process.env.AUTH_MAIL,
    to: email,
    subject: "Reset Your Reboot 20 password",
    text: `Click this link to reset your password: http://localhost:3000/reset-password?token=${resetToken}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
