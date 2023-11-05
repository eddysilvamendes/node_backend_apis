const router = require("express").Router();
const orderController = require("../controller/orderController");
const { verifyAndAuthorization } = require("../middleware/verifyToken");

router.post("/", verifyAndAuthorization, orderController.placeOrder);
router.put("/rate/:id", verifyAndAuthorization, orderController.rateOrders);
router.put(
  "/status/:id",
  verifyAndAuthorization,
  orderController.updateOrderStatus
);
router.put(
  "/payment/:id",
  verifyAndAuthorization,
  orderController.updatePaymentStatus
);
router.get(
  "/user-orders",
  verifyAndAuthorization,
  orderController.getUserOrder
);
router.get("/:id", verifyAndAuthorization, orderController.getOrderDetails);

module.exports = router;
