const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");


const UserSchema = new mongoose.Schema({
  name: { type: String,  required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  role: { type: String, enum: ["educator", "student"], required: true },
  collegeName: String,
  experience: Number,
  branch: String,
  year: Number,
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
