const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

exports.welcomeMail = (data) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "cricfeed1@gmail.com",
      pass: "Cricfeed@1234",
    },
  });
  const subject = "Verify Mail";

  const html = `<html><head> <style> @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap'); </style> <style> body { font-family: 'Open Sans', sans-serif; } .w-100{ width: 100%; } .text-center{ text-align: center; } .text-blue{ color: #19398a; } h1.logo{ font-size: 3rem; margin: 2.75rem auto; } .userName{ font-size: 1.5rem; margin-bottom: 1rem; } .wlcmMsg{ font-size: 1rem; line-height: 1.5; } .font-bold{ font-weight: 700; } .mb-5{ margin-bottom: 3rem; } .link{ padding: .5rem 1rem; border-radius: 2rem; background-color: #19398a; color: #fff; text-decoration: none; } </style></head><body> <table class="w-100"> <tr> <th>  </th> </tr> <tr> <td> <p class="userName text-center"> Hi, ${data["name"]} <!-- \r\n\r\n --> </p> </td> </tr> <tr> <td> <p class="text-center wlcmMsg"> Welcome to Cricfeed! </p> <p class="text-center wlcmMsg mb-5"> We&rsquo;re excited to have you as part of our community! </p> <!-- <p> \r\n\r\n </p> --> </td> </tr> <tr> <td> <h5 class="text-center font-bold"> Please let us know how can we help you and get started on your journey ! </h5> </td> </tr> <tr> <td> <!-- <p>\r\n\r\n</p> --> </td> </tr> </table></body></html>`;

  const mailOptions = {
    from: "cricfeed1@gmail.com",
    to: data["receiver_email"],
    subject: subject,
    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error, "error");
    } else {
      Logger.info("Email sent: " + info.response);
    }
  });
};
