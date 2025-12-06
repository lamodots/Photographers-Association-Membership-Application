const nodemailer = require("nodemailer");
const path = require("path");
const pug = require("pug");

module.exports = class EmailServices {
  #transporter;
  #templateDir = path.join(process.cwd(), "server", "src", "views", "emails");

  constructor() {
    this.#transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_HOST,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });
  }

  #renderTemplate(data, templateName) {
    try {
      return pug.renderFile(path.join(this.#templateDir, templateName), {
        fullUrl: data.fullUrl,
        verificationToken: data.verificationToken,
        newUserEamil: data.newUserEamil,
      });
    } catch (error) {
      if (error.code === "ENOENT") {
        console.error("Pug template not found, check file path");
      }
      throw error.message;
    }
  }

  async #send(data, subject, template) {
    try {
      const response = await this.#transporter.sendMail({
        from: `Kerala Samajam Nigeria ${process.env.EMAIL_HOST}`,
        to: data.newUserEamil,
        subject,
        html: template,
      });

      if (response.rejected.length > 0) {
        console.log("📧 Email sending failed to", response.rejected);
      } else {
        console.log("📧 Email sent successfully.", response.messageId);
      }
    } catch (err) {
      console.error("❌ Error sending email:", err.message || err);
      throw new Error("Failed to send email");
    }
  }
  async sendVerificationEmail(data) {
    const templateName = "welcome.email.pug";
    const template = this.#renderTemplate(data, templateName);
    await this.#send(data, "Verify Email Address", template);
  }
  async forgotPasswordVerification(data) {}
};
