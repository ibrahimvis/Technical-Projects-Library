require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.header("x-auth-token");

  if (!token) {
    return res.status(400).json({ message: "Token not found please log in" });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded.user;
      next();
    } catch (error) {
      return res.status(400).json({ message: "Your token is invalid" });
    }
  }
};
