const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
dotenv.config();

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      host: process.env.HOST_MAIL_BREVO,
      port: process.env.MAIL_PORT || 587,
      secure: false,
      auth: {
        user: process.env.HOST_MAIL,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendEmail(from, to, subject, text) {
    try {
      let mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: text,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
      return info;
    } catch (error) {
      console.error("Error occurred:", error);
      throw error;
    }
  }
}

module.exports = EmailService;
