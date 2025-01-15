const { BadRequestError } = require("../../errors");
const Applicant = require("../../models");
const {
  createApplicantService,
  getApplicantsByEventService,
  approveApplicantService,
} = require("../../services");
// const Event = require("../models/event");
const QRCode = require("qrcode");
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const { sendEmailSendGridServices } = require("../../config");
const { sendGridEmailTemplate } = require("../../utils");

exports.createApplicant = async (req, res, next) => {
  const {
    full_name,
    email,
    phone_number,
    whatsapp_number,
    number_of_family_members,
    attendees,
    event,
  } = req.body;
  if (
    !full_name ||
    !email ||
    !phone_number ||
    !whatsapp_number ||
    !number_of_family_members ||
    !event
  ) {
    return next(new BadRequestError("Fileds must me filled!"));
  }
  try {
    const applicant = await createApplicantService(req.body);

    res.status(201).json({ ok: true, applicant });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.approveApplicant = async (req, res, next) => {
  try {
    console.log(req.params.applicationId);
    const { applicant } = await approveApplicantService(
      req.params.applicationId
    );

    const msg = sendGridEmailTemplate(applicant);
    await sendEmailSendGridServices(msg);

    return res.status(200).json({
      message: "Application approved and email sent",
      applicant,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getApplicantsByEvent = async (req, res) => {
  try {
    const applicants = await getApplicantsByEventService(req.params.eventId);

    res.status(200).json({ ok: true, count: applicants.length, applicants });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
