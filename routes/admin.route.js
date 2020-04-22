const router = require("express").Router();

let User = require("../models/user.model");
let Project = require("../models/project.model");

let isLoggedIn = require("../config/config");

router.get("/", isLoggedIn, async (req, res) => {
  if (!req.user.isSuperAdmin) {
    res.status(403).json("Not Cool");
  } else {
    try {
      let users = await User.find({});
      let projects = await Project.find({}).populate("user");
      res.status(200).json({ users, projects });
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
      let user = await User.findById(req.params.id).populate('project');
      if (!user) throw {message: "couldn't find usere"};

      user.project.forEach(e => {
        Project.findByIdAndDelete(e._id).then(p => {
          //console.log(p);
        }).catch(e => console.log(e))
      })

      user = await User.findByIdAndDelete(req.params.id);

      res.status(200).json({ user, message: "Deleted!" });
    } catch (error) {
      res.json(error);
    }
  }
});

router.get("/delete/project/:id", isLoggedIn, async (req, res) => {
  if (!req.user.isSuperAdmin) {
    res.status(403).json("Not Cool");
  } else {
    try {
      let project = await Project.findByIdAndDelete(req.params.id);
      if (!project) throw { message: "Couldn't find the project" };
      res.status(200).json({ project });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "something went south check the logs" });
    }
  }
});

router.post("/edit/user/", isLoggedIn, async (req, res) => {
  if (!req.user.isSuperAdmin) {
    res.status(403).json("Not Cool");
  } else {
    try {
      let { _id, isAdmin, isSuperAdmin } = req.body;
      let user = await User.findByIdAndUpdate(_id, {
        $set: { isAdmin, isSuperAdmin },
      });
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "something went south check the logs" });
    }
  }
});

router.post("/edit/project/", isLoggedIn, async (req, res) => {
  if (!req.user.isSuperAdmin) {
    res.status(403).json("Not Cool");
  } else {
    try {
      let { _id, image, title, contributor, description, github } = req.body;
      let project = await Project.findByIdAndUpdate(_id, {
        $set: { image, title, contributor, description, github },
      });
      res.status(200).json(project);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "something went south check the logs" });
    }
  }
});

module.exports = router;
