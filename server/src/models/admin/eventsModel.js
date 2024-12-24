const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema(
  {
    title: String,

    startDate: {
      type: Date,
      //   required: true,
    },
    endDate: {
      type: Date,
      //   required: true,
    },
    photoImage: String,
    description: {
      type: String,
      max: 400,
    },
    duration: String,
    applicants: [
      {
        id: { type: mongoose.Types.ObjectId, auto: true },
        name: { type: String },
        email: { type: String },
        appliedAt: { type: Date, default: Date.now },
        barCode: String,
      },
    ],

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      //   required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Events", eventsSchema);
