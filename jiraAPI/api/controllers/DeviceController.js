/**
 * DeviceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getDeviceUser: async (req, res) => {
    try {
      const id = req.params.id;
      const deviceUser = await Device.findOne({ _id: id });
      console.log("deviceUser", deviceUser);
      res.json(deviceUser);
    } catch (error) {
      // return res.status(400).json({
      //   mesage: `error ${error}`,
      // });
      console.log("error", error);
    }
  },

  getDeviceUsers: async (req, res) => {
    try {
      const deviceUser = await Device.find();
      // console.log(deviceUser);
      res.json(deviceUser);
    } catch (error) {
      return res.status(400).json({
        mesage: `error ${error}`,
      });
    }
  },

  createDevice: async (req, res) => {
    try {
      const deviceCreate = await Device.create(req.body).fetch();
      res.status(200).json({
        deviceCreate,
      });
    } catch (error) {
      return res.status(400).json({
        mesage: `error ${error}`,
      });
    }
  },
  updateDevice: async (req, res) => {
    try {
      const id = req.params.id;
      const ExitDeviceUser = await Device.findOne({ _id: id });
      if (!ExitDeviceUser) {
        return res.status(404).json({
          mesage: "Email does not exist",
        });
      }
      const updateDeviceUSer = await Device.updateOne({ _id: id }).set({
        device: req.body.device,
      });
      console.log(updateDeviceUSer);
    } catch (error) {
      return res.status(400).json({
        mesage: `error ${error}`,
      });
    }
  },
};
