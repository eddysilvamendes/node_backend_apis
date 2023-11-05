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
      response.status(500).json({ status: true, message: error.message });
    }
  },
  setDriverAvailability: async (request, response) => {},
};
