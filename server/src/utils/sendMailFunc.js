const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

//setting up refresh token.
oAuth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});

const sendMailFunc = async (msg) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    if (!accessToken || !accessToken.token) {
      throw new Error("Failed to retrieve access token.");
    }
    console.log("Access token retrieved successfully.");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_HOST,
        pass: process.env.HOST_PASSWORD,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    await transporter.verify();
    console.log("Transporter is configured correctly.");

    // const mailOptions = {
    //   from: `KSN MEMBERSHIP`,
    //   to: `crytechcrytech@gmail.com`,
    //   // replyTo: EMAIL_HOST,
    //   subject: "Hello welcome",
    //   text: "Test Message from KSN MEMBERSHIP Website",
    //   html: `<div>
    //               <h1>Hello anthony@gmail.com</h1>

    //               <p>TestMessage from KSN MEMBERSHIP Website</p>
    //              </div>`,
    // };

    await transporter.sendMail(msg);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = sendMailFunc;
