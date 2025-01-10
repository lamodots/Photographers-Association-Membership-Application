const mongoose = require("mongoose");

const eventApplicantSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },

  phone_number: {
    type: String,
    required: true,
  },
  whatsapp_number: {
    type: String,
    required: true,
  },
  number_of_family_members: [
    {
      id: { type: mongoose.Types.ObjectId, auto: true },
      attendee_full_name: String,
    },
  ],
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Events",
  },
  appliedAt: { type: Date, default: Date.now },
  barCode: String,
});

module.exports = mongoose.model("Applicants", eventApplicantSchema);
