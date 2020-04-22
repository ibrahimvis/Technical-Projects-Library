require("dotenv").config();

const router = require("express").Router();

let User = require("../models/user.model");
let Project = require("../models/project.model");

let isLoggedIn = require("../config/config");

/** View all Project */
router.get("/", async (req, res) => {
  try {
    let projects = await Project.find({}).populate("user", "-password");
    res.status(200).json({ projects });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went south check the logs" });
  }
});

/** View One Project By ID */
router.get("/:id", async (req, res) => {
  try {
    let project = await Project.findById(req.params.id).populate(
      "user",
      "-password"
    );
    res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went south check the logs" });
  }
});

/** Create a Project */
router.post("/create", isLoggedIn, async (req, res) => {
  try {
    let { image, title, contributor, description, github, user } = req.body;
    let project = await new Project({
      image,
      title,
      contributor,
      description,
      github,
      user,
    }).save();
    await User.findByIdAndUpdate(user, { $push: { project: project._id } });
    res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went south check the logs" });
  }
});

/** Update a Project */
router.post("/update", isLoggedIn, async (req, res) => {
  try {
    let { _id, image, title, contributor, description, github } = req.body;
    await Project.findByIdAndUpdate(_id, {
      $set: { image, title, contributor, description, github },
    });

    let project = await Project.findById(_id);
    res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went south check the logs" });
  }
});

/** Delete One Project By ID */
router.get("/delete/:id", isLoggedIn, async (req, res) => {
  try {
    let project = await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went south check the logs" });
  }
});

module.exports = router;
