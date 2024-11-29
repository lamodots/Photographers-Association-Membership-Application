const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  image: { type: String },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  email: {
    type: String,
    unique: [true, "Email already exist"],
  },
  password: { type: String },
  Dob: { type: Date },
  phone: { type: String },
  location: { type: String },
  address: { type: String },
  aboutUser: { type: String },
  social: { type: String },
  interest: { type: Array },
  role: {
    enum: ["user", "moderator", "admin"],
    default: "user",
  },
});

module.exports = mongoose.model("User", UserSchema);
