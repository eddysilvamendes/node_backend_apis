const Cart = require("../models/Cart");

module.exports = {
  addProductToCart: async (request, response) => {
    const user_id = request.user.id;
    const { product_id, total_price, quantity } = request.boddy;
    let count;

    try {
      const existing_product = await Cart.findOne({ user_id, product_id });
      count = await Cart.countDocuments({ user_id });
      if (existing_product) {
        (existing_product.quantity += 1),
          (existing_product.total_price += total_price),
          await existing_product.save();
      } else {
        const newCart = new Cart({
          user_id: user_id,
          product_id: request.body.product_id,
          additives: request.body.additives,
          total_price: request.body.total_price,
          quantity: request.body.quantity,
        });
        await newCart.save();
        count = await Cart.countDocuments({ user_id });
      }
      response.status(200).json({ status: true, count: count });
    } catch (error) {
      response.status(200).json({ status: false, error: error.message });
    }
  },
  removeProductFromCart: async (request, response) => {},
  fetchUserCart: async (request, response) => {},
  clearUserCart: async (request, response) => {},
  getCartCount: async (request, response) => {},
  decrimentProductQty: async (request, response) => {},
};
