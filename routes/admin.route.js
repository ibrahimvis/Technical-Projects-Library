const router = require("express").Router();

let User = require("../models/user.model");
let Project = require("../models/project.model");

let isLoggedIn = require("../config/config");

router.get("/", isLoggedIn, async (req, res) => {
  if (!req.user.isSuperAdmin) {
    res.status(403).json("Not Cool");
  } else {
    try {
      let users    = await User.find({});
      let projects = await Project.find({});
      res.status(200).json({users, projects});
    } catch (error) {
      res.json(error);
    }
  }
});

router.get("/delete/user/:id", isLoggedIn, async (req, res) => {
    if (!req.user.isSuperAdmin) {
      res.status(403).json("Not Cool");
    } else {
      try {
        let user = await User.findByIdAndDelete(req.params.id);
        if (!user) throw {message: "Couldn't find the user"}
        await user.project.map(p => {
            let x = Project.findByIdAndDelete(p);
            console.log(x)
        })
        res.status(200).json({user, message: "Deleted!"});
      } catch (error) {
        res.json(error);
      }
    }
});

router.get("/delete/project/:id", async (req, res) => {
    try {
      let project = await Project.findByIdAndDelete(req.params.id);
      if (!project) throw {message: "Couldn't find the project"}
      res.json({ project }).status(200);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "something went south check the logs" });
    }
});

module.exports = router;