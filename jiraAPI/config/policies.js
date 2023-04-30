/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */
// const authorization = require("isLoggedln");

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  AuthController: {
    signin: "isDevice",
    // signin: true,
    signup: true,
    verifyOtp: true,
  },
  // OtpController: {
  //   insertOtp: true,
  // },
  OtpController: {
    sendOtp: true,
  },
  DeviceController: {
    getDeviceUser: true,
    createDevice: true,
    updateDevice: true,
  },
  "*": "isLoggedIn",
};
