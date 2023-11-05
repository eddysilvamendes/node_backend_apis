const router = require("express").Router();
const cartController = require("../controller/cartController");
const { verifyAndAuthorization } = require("../middleware/verifyToken");

router.post("/", verifyAndAuthorization, cartController.addProductToCart);
router.post(
  "/decrement",
  verifyAndAuthorization,
  cartController.decrimentProductQty
);
router.delete(
  "/delete/:id",
  verifyAndAuthorization,
  cartController.removeProductFromCart
);
router.delete("/clear", verifyAndAuthorization, cartController.clearUserCart);
router.get("/", verifyAndAuthorization, cartController.fetchUserCart);
router.get("/count", verifyAndAuthorization, cartController.getCartCount);

module.exports = router;
