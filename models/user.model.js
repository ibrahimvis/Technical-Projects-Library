const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    default: false
  },

  isSuperAdmin: {
    type: Boolean,
    default: false
  },

  project: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Project'
      }
    ],
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  let hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
  next();
});

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

let User = mongoose.model("User", userSchema);
module.exports = User;
