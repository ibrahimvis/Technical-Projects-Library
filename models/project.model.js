const mongoose = require("mongoose");

let projectSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },

    title: {
      type: String,
      required: true,
    },

    contributor: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    github: {
      type: String,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

let Project = mongoose.model("Project", projectSchema);
module.exports = Project;
