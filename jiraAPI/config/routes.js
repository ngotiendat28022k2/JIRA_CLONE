/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "/": { view: "pages/homepage" },
  // "GET /users": "UsersController.listUser",
  // "GET /users/:id": "UsersController.getUser",
  // "POST /user": "UsersController.signup",
  // "GET /user": "UsersController.signin",
  // "PUT /users/:id": "UsersController.updateUser",
  // "DELETE /users/:id": "UsersController.removeUser",

  // "GET /task": "IssueController.listTask",
  // "GET /task/:id": "IssueController.getTask",
  "POST /issue": "IssueController.createIssue",
  "GET /issues/": "IssueController.searchIssues",
  // "DELETE /task/:id": "IssueController.removeTask",

  // "GET /project": "ProjectController.listProject",
  "GET /project/:id": "ProjectController.getProject",
  // "POST /project": "ProjectController.createProject",
  // "PUT /project/:id": "ProjectController.updateProject",
  "DELETE /project/:id": "ProjectController.removeProject",

  "GET /device/:id": "DeviceController.getDeviceUser",
  "GET /device": "DeviceController.getDeviceUsers",
  "POST /device": "DeviceController.createDevice",
  "PUT /device/:id": "DeviceController.updateDevice",

  "POST /signup": "AuthController.signup",
  "POST /signin": "AuthController.signin",
  "POST /verify_otp": "AuthController.verifyOtp",

  "POST /send_otp": "OtpController.sendOTP",
  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
