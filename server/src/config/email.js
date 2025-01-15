const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

exports.sendEmailSendGridServices = async (msg) => {
  sgMail.setApiKey(
    "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"
  );

  await sgMail.send(msg);
};

exports.sendEmailNodemailerServices = async () => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "f43c396cea590c",
      pass: "96af4e5367ec48",
    },
  });

  return transporter;

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     return res.status(500).json({ error: error.message });
  //   }
  //   res
  //     .status(200)
  //     .json({ message: "Application approved and email sent", applicant });
  // });
};
