require("dotenv").config();
require('./config/db'); 

const express    = require('express');
const bodyParser = require('body-parser');

const authUserRoute = require('./routes/auth.route');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authUserRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));