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
    subject: "Reset Your Reboot 20 Password",
    text: `Hello,

We received a request to reset your password for your Reboot 20 account.

Click the link below to reset your password:
${process.env.BASE_URL}/reset-password?token=${resetToken}

If you did not request this, please ignore this email or contact support if you have questions.

Thank you,
Reboot 20 Team
`,
    html: `
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #333;">Reset Your Reboot 20 Password</h2>
      <p>Hello,</p>
      <p>We received a request to reset your password for your Reboot 20 account.</p>
      <p>Click the link below to reset your password:</p>
      <p>
       ${process.env.BASE_URL}/reset-password?token=${resetToken}
      </p>
      <p>If you did not request this, please ignore this email or contact support if you have questions.</p>
      <p>Thank you,</p>
      <p>Reboot 20 Team</p>
      <hr style="border: none; border-top: 1px solid #ccc;" />
      <p style="font-size: 0.9em; color: #666;">This email was sent to you by Reboot 20.</p>
      <p style="font-size: 0.9em; color: #666;">Our mailing address is:</p>
      <p style="font-size: 0.9em; color: #666;">Reboot 20, 1234 Some St, Some City, Some Country</p>
    </body>
    </html>
  `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
