const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password") || this.isNew) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  } catch (error) {
    next(error);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
