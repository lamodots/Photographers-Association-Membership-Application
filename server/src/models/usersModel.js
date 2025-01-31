const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    image: { type: String },
    firstname: { type: String, trim: true },
    lastname: { type: String, trim: true },
    email: {
      type: String,
      required: [true, "Please provide email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: [true, "Email already exist"],
    },
    password: { type: String, required: [true, "Please provide email"] },
    Dob: { type: Date },
    phone: { type: String },
    location: { type: String },
    address: { type: String },
    aboutuser: { type: String },
    social: { type: Array },
    interest: { type: Array },
    role: {
      type: String,
      enum: ["user", "moderator", "admin"],
      default: "user",
    },
    userSubscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSubscription",
    },
  },

  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};
module.exports = mongoose.model("Users", UserSchema);
