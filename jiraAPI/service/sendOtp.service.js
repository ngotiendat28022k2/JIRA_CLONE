const OtpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const { insertOtp } = require("./otp.service");
const nodemailer = require("nodemailer");

let testAccount;
(async () => {
  testAccount = await nodemailer.createTestAccount();
})();

module.exports = {
  sendOTP: async (email) => {
    try {
      const user = await User.findOne({ email });
      // console.log("user", user);
      if (!user) {
        return res.status(400).json({
          mesage: "user notfound!",
        });
      }
      console.log(user);
      const device = await Device.findOne({ email });
      console.log(device);
      if (device === undefined) {
        next();
      }
      console.log("user.myDevice", user.myDevice);

      const otpCreate = OtpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      const resultOtp = await insertOtp(otpCreate, email);
      if (resultOtp) {
        let transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
          },
        });

        transporter
          .sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `OTP: ${otpCreate}`, // html body
          })
          .then((info) => {
            console.log(
              "Preview URL Otp: %s",
              nodemailer.getTestMessageUrl(info)
            );
          })
          .catch((error) => {
            console.log("Send Mail False", error);
          });
      }
    } catch (error) {
      return res.status(400).json({
        error: `error ${error}`,
      });
    }
  },
};
