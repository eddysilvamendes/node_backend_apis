const Driver = require("../models/Driver");

module.exports = {
  registerDriver: async (request, response) => {
    const driver = new Driver(request.body);
    try {
      await driver.save();
      response
        .status(201)
        .json({ status: true, message: "Driver registred successfully" });
    } catch (error) {
      response.status(500).json({ status: false, message: error.message });
    }
  },
  setDriverAvailability: async (request, response) => {
    const driver_id = request.params.id;
    try {
      const driver = await Driver.findById(driver_id);
      if (!driver_id) {
        return response
          .status(404)
          .json({ status: false, message: "Driver not found!" });
      }
      driver.is_available = !driver.is_available;
      await driver.save();
      response.status(200).json({ status: true, message: "Driver updated" });
    } catch (error) {
      response.status(500).json({ status: false, message: error.message });
    }
  },
  getAllDriver: async (request, response) => {
    try {
      const drivers = await Driver.find();
      if (!drivers) {
        return response
          .status(404)
          .json({ status: false, message: "Drivers not found" });
      }
      response.status(200).json(drivers);
    } catch (error) {
      response.status(500).json({ status: false, message: error.message });
    }
  },
  getDriverDetail: async (request, response) => {
    const driver_id = request.params.id;
    try {
      const driver = await Driver.findById(driver_id);
      if (!driver) {
        return response
          .status(404)
          .json({ status: false, message: "Driver not found" });
      }
      response.status(200).json(driver);
    } catch (error) {
      response.status(500).json({ status: false, message: error.message });
    }
  },
};
