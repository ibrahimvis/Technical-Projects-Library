require("dotenv").config();
require("./config/db");

const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");

const authUserRoute = require("./routes/auth.route");
const projectRoute  = require("./routes/project.route");
const adminRoute    = require("./routes/admin.route");
const userPRoute    = require("./routes/user.route");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/auth", authUserRoute);
app.use("/api/project", projectRoute);
app.use("/api/admin", adminRoute);
app.use(userPRoute);


app.listen(port, () => console.log(`Listening on port ${port}`));
