const Applicant = require("../../models");

exports.createApplicantService = async (applicantData) => {
  const applicant = new Applicant.Applicants(applicantData);
  await applicant.save();

  console.log(applicant);
  return applicant;
};

exports.approveApplicantService = async (applicantId) => {
  const applicant = await Applicant.Applicants.findById(applicantId).populate(
    "event",
    "title photoImage time venue"
  );

  console.log(applicant);
  console.log(applicant.eventId);

  if (!applicant) {
    throw new Error("Applicant not found");
  }
  if (applicant.isapproved) {
    throw new Error("Applicant already approved");
  }
  applicant.barCode = `https://api.qrserver.com/v1/create-qr-code/?data=${applicant._id}`;
  applicant.isapproved = true;
  await applicant.save();
  return { applicant };
};

exports.getApplicantsByEventService = async (event) => {
  return await Applicant.Applicants.find({ event });
};
