/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

require("dotenv").config();
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { isOTP } = require("../../service/otp.service");

module.exports = {
  signup: async (req, res) => {
    try {
      const exitEmail = await User.findOne({ email: req.body.email });
      console.log("exitEmail", exitEmail);
      if (exitEmail) {
        return res.status(401).json({
          message: "Email Exists",
        });
      }

      const passwordNano = nanoid(8);
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(passwordNano, salt);

      const user = await User.create({
        email: req.body.email,
        // password: req.body.email,
        password: hashed,
        // token,
      }).fetch();
      console.log("user", user);

      // const device = {
      //   userID: user.id,
      // };
      // await Device.create(device).fetch();

      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 465,
        secure: true, // true for 465, false for other ports
        service: "gmail",
        auth: {
          user: process.env.TKSENDGMAIL,
          pass: process.env.PASSWORDSENDMAIL,
        },
      });

      const mailOptions = {
        from: process.env.TKSENDGMAIL, // sender address
        to: req.body.email, // list of receivers
        subject: "JIRA ACCOUNT", // Subject line
        text: "welcome Jira", // plain text body
        html: `  <br> email: ${req.body.email} && password : ${passwordNano} `, // html body
      };
      // here we actually send it
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log("Error sending message: " + err);
        } else {
          // no errors, it worked
          console.log("Message sent succesfully.");
        }
      });

      // const user = await User(newUser).save();
      if (user) {
        user.password = undefined;
        res.status(200).json({
          message: "User create Successfully !!!",
          user,
        });
      }
    } catch (error) {
      console.log("error", error);
      return res.status(400).json({
        message: "Signup False",
        error,
      });
    }
  },

  signin: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({
          message: "Email không tồn tại",
        });
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(400).json({
          message: "password is not correct",
        });
      }

      if (validPassword && user) {
        const token = jwt.sign(
          { _id: user.id, email: user.email },
          process.env.SECRETKEY,
          {
            expiresIn: "90d",
          }
        );
        userNew = {
          id: user.id,
          email: user.email,
          avatar: user.avata,
        };
        return res.status(200).json({ user: userNew, token });
      } else {
        return res.status(403).json({
          message: "Incorrect account or password",
          error,
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: "Incorrect account or password",
        error,
      });
    }
  },

  verifyOtp: async (req, res) => {
    try {
      const { email, otp } = req.body;
      const otpUser = await Otp.find({ email: email });
      if (!otpUser.length) {
        return res.status(401).json({
          message: "OTP NOTFOUND",
        });
      }
      const otpLast = otpUser[otpUser.length - 1];

      const isOtp = await bcrypt.compare(otp, otpLast.otp);
      if (!isOtp) {
        return res.status(401).json({
          message: "otp invalid",
        });
      }

      if (isOtp && email === otpLast.email) {
        await Otp.destroy({ email });
        return res.status(200).json({
          message: "otp exactly",
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: `error ${error}`,
      });
    }
  },
};
