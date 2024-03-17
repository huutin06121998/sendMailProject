const express = require("express");
const bodyParser = require("body-parser");

const EmailService = require("./sendMailService/mail.services");
const dotenv = require("dotenv");

const app = express();
const emailService = new EmailService();

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/serivce/sendEmail", (req, res) => {
  const { username, password } = req.body;
  emailService
    .sendEmail(
      process.env.HOST_MAIL,
      process.env.MAIL_TEST,
      process.env.NO_REPLY_EMAIL,
      `This is the email sent from the server. <br><b>Username:</b> ${username} <br><b>Password:</b> ${password}`
    )
    .then(() => {
      console.log("Email sent successfully");
      res.send("Email sent successfully");
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
