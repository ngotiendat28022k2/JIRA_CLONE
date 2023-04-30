const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    // const authorizationHeader = req.headers["authorization"];
    // const token = authorizationHeader.split(" ")[1];
    // // console.log("token", token);
    // if (token === "undefined") {
    //   return res.sendStatus(401).end();
    // }
    // // console.log("token", token);
    // jwt.verify(token, process.env.SECRETKEY, (error, data) => {
    //   // console.log("error", error);
    //   // console.log("data", data);
    //   if (error) return res.sendStatus(403);
      next();
    // });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};
