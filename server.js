require("dotenv").config();
require("./config/db");

const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");

const authUserRoute = require("./routes/auth.route");
const projectRoute = require("./routes/profile.route");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/auth", authUserRoute);
app.use("/api/project", projectRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));
