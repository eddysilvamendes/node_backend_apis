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
      response.status(200).json({ status: false, message: error.message });
    }
  },
  removeProductFromCart: async (request, response) => {
    const item_id = request.params.id;
    const user_id = request.params.id;
    let count;
    try {
      const cart_item = await Cart.findById(item_id);
      if (!cart_item) {
        return response
          .status(404)
          .json({ status: false, message: "Cart item not found!" });
      }
      await Cart.findByIdAndDelete({ _id: item_id });
      count = await Cart.countDocuments({ user_id });
      response.status(200).json({ status: true, count: count });
    } catch (error) {
      response.status(500).json({ status: false, message: error.message });
    }
  },
  fetchUserCart: async (request, response) => {
    const user_id = request.user.id;

    try {
      const user_cart = await Cart.find({ user_id }).populate({
        path: "product_id",
        select: "title imageUrl restaurant, rating, ratingCount",
      });
      response.status(200).json({ status: true, cart: user_cart });
    } catch (error) {
      response.status(500).json({ status: false, message: error.message });
    }
  },
  clearUserCart: async (request, response) => {
    const user_id = request.user.id;
    let count;
    try {
      await Cart.deleteMany({ user_id });
      count = await Cart.countDocuments({ user_id });
      response.status(200).json({
        status: true,
        message: "Cart cleared successfully!",
        count: count,
      });
    } catch (error) {
      response.status(500).json({ status: false, message: error.message });
    }
  },
  getCartCount: async (request, response) => {
    const user_id = request.user.id;

    try {
      const count = await Cart.countDocuments({ user_id });
      response.status(200).json({ status: true, count: count });
    } catch (error) {
      response.status(500).json({ status: false, message: error.message });
    }
  },
  decrimentProductQty: async (request, response) => {
    const user_id = request.user.id;
    const product_id = request.body.product_id;
    let count;
    try {
      const cart_item = Cart.find({ user_id: user_id, product_id: product_id });
      if (!cart_item) {
        response
          .status(404)
          .json({ status: false, message: "Cart item not found!" });
      }
      const product_price = cart_item.total_price / cart_item.quantity;
      if (cart_item.quantity > 1) {
        cart_item.quantity -= 1;
        cart_item.total_price -= product_price;
        await cart_item.save();
        response
          .status(200)
          .json({ status: true, message: "Cart item quantity decremented" });
      } else if (cart_item.quantity === 1) {
        await Cart.findByIdAndDelete({
          user_id: user_id,
          product_id: product_id,
        });
        count = await Cart.countDocuments({ user_id });
        response
          .status(200)
          .json({ status: true, message: "Cart item removed", count: count });
      }
    } catch (error) {
      response.status(500).json({ status: false, message: error.message });
    }
  },
};
