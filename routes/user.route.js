require("dotenv").config();

const router = require("express").Router();

let User = require("../models/user.model");
let Project = require("../models/project.model");

let isLoggedIn = require("../config/config");

router.get("/", isLoggedIn, (req, res) => {

    

});

module.exports = router;