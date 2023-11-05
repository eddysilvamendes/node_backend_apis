const Address = require("../models/Address");

module.exports = {
  createAddress: async (request, response) => {
    const address = new Address({
      user_id: request.user.id,
      address_line_1: request.body.address_line_1,
      city: request.body.city,
      state: request.body.state,
      district: request.body.district,
      postal_code: request.body.postal_code,
      country: request.body.country,
      delivery_instructions: request.body.delivery_instructions,
      default: request.body.default,
    });

    try {
      if (request.body.default) {
        await Address.updateMany(
          {
            user_id: request.user.id,
          },
          { default: false }
        );
      }
      await address.save();
      response
        .status(201)
        .json({ status: true, message: "Address created successfully!" });
    } catch (error) {
      response.status(500).json({ status: false, message: error.message });
    }
  },
  deleteAddress: async (request, response) => {
    const address_id = request.params.id;
    try {
      const address = await Address.findById(address_id);
      if (!address) {
        return response
          .status(404)
          .json({ status: false, message: "Address not found!" });
      }
      await Address.findByIdAndDelete(address_id);
      response
        .status(500)
        .json({ status: true, message: "Address deleted successfully" });
    } catch (error) {
      response.status(500).json({ status: false, message: error.message });
    }
  },
  getDefaultAddress: async (request, response) => {
    const user_id = request.user.id;
    try {
      const default_address = await Address.findOne({ user_id, default: true });
      response.status(200).json(default_address);
    } catch (error) {
      response.status(500).json({ status: false, message: error.message });
    }
  },
  getUserAddresses: async (request, response) => {
    const user_id = request.user.id;
    try {
      const address = await Address.find({ user_id });
      response.status(200).json(address);
    } catch (error) {
      response.status(500).json({ status: false, message: error.message });
    }
  },
  updateAddress: async (request, response) => {
    const address_id = request.params.id;
    const address = new Address({
      user_id: request.user.id,
      address_line_1: request.body.address_line_1,
      city: request.body.city,
      state: request.body.state,
      district: request.body.district,
      postal_code: request.body.postal_code,
      country: request.body.country,
      delivery_instructions: request.body.delivery_instructions,
      default: request.body.default,
    });

    try {
      if (request.body.default) {
        await Address.updateMany(
          { user_id: request.user.id },
          { default: false }
        );
      }
      await Address.findByIdAndUpdate(address_id, address, { new: true });
      response
        .status(201)
        .json({ status: true, message: "Address updated successfully!" });
    } catch (error) {
      response.status(500).json({ status: false, message: error.message });
    }
  },
  setDetaultAddress: async (request, response) => {
    const address_id = request.body.address_id;
    const user_id = request.user.id;

    try {
      await Address.updateMany(
        {
          user_id,
        },
        { default: false }
      );
      const updated_address = await Address.findByIdAndUpdate(
        address_id,
        { default: true },
        { new: true }
      );
      if (updated_address) {
        response
          .status(200)
          .json({ status: true, message: "Address updated successfully" });
      } else {
        response
          .status(404)
          .json({ status: false, message: "Address not found" });
      }
    } catch (error) {
      response.status(500).json({ status: false, message: error.message });
    }
  },
};
