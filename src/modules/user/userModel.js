// backend/models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now},
});

userSchema.pre(`save`, function (callback) {
  const user = this;
  user.updated = new Date(Date.now());
  if (!user.isModified(`password`)) return callback();
  bcrypt.genSalt(5, (err, salt) => {
    if (err) return callback(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});
userSchema.methods.comparePassword = async function (
  candidatePassword,
  hashedPassword
) {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
