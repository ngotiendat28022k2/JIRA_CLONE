const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
  try {
    // const { email, password } = req.body;
    // const deviceHeaders = req.headers["device"];
    // const deviceParse = JSON.parse(deviceHeaders);
    // const user = await User.findOne({ email });
    // const validPassword = await bcrypt.compare(password, user.password);
    // if (!user) {
    //   return res.status(404).json({
    //     message: "Exit User",
    //   });
    // }
    // if (!validPassword) {
    //   return res.status(400).json({
    //     message: "password is not correct",
    //   });
    // }
    // const device = {
    //   device: deviceParse,
    //   userID: user.id,
    //   email: user.email,
    // };
    // const deviceUser = await Device.find({
    //   userID: user.id,
    //   os: deviceParse.os,
    //   ip: deviceParse.ip,
    //   ua: deviceParse.ua,
    // });
    // console.log(deviceUser);
    // if (deviceUser.length === 0) {
    //   console.log(123);
    //   return res.status(200).json({
    //     device,
    //   });
    // }
    next();
  } catch (error) {
    return res.status(400).json({
      message: `error ${error}`,
    });
  }
};
