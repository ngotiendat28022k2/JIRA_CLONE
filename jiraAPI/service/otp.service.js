const bcrypt = require("bcrypt");

module.exports = {
  insertOtp: async (otp, email) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashOtp = await bcrypt.hash(otp, salt);
      await Otp.create({
        email,
        otp: hashOtp,
      }).fetch();
      return Otp ? true : false;
    } catch (error) {
      console.log(error);
    }
  },

  isOtp: async (isValid) => {
    try {
      if (isValid) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  },
};
