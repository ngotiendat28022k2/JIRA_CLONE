/**
 * OtpController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require("bcrypt");
const OtpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const { insertOtp } = require("../../service/otp.service");
const { reject } = require("lodash");

require("dotenv").config();

module.exports = {
  sendOTP: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      // console.log("user", user);
      if (!user) {
        return res.status(400).json({
          mesage: "user not found!",
        });
      }
      const otpCreate = OtpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      const resultOtp = await insertOtp(otpCreate, email);
      if (resultOtp) {
        console.log("otpCreate", otpCreate);
        let transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 465,
          secure: true, // true for 465, false for other ports
          // auth: {
          //   user: testAccount.user, // generated ethereal user
          //   pass: testAccount.pass, // generated ethereal password
          // },
          service: "gmail",
          auth: {
            user: process.env.TKSENDGMAIL,
            pass: process.env.PASSWORDSENDMAIL,
          },
        });

        const mailOptions = {
          from: process.env.TKSENDGMAIL,
          to: email,
          subject: "OTP CHECK DEVICE",
          text: `OTP ${email}: ${otpCreate}`,
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
      }
      res.status(200).json({
        resultOtp,
      });
    } catch (error) {
      return res.status(400).json({
        error: `error ${error}`,
      });
    }
  },
};
