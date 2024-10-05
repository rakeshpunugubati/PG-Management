const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ID, 
      pass: process.env.PASS_KEY, 
    },
  });

const sendMail = async (to,  otp) => {
    const mailOptions = {
      from: process.env.MAIL_ID,
      to: to,
      subject: "OTP for changing password",
      text: `OTP: ${otp}`,
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };

  module.exports = sendMail