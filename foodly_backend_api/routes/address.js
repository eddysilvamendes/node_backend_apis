const router = require("express").Router();
const addressController = require("../controller/addressController");
const { verifyAndAuthorization } = require("../middleware/verifyToken");

router.post("/", verifyAndAuthorization, addressController.createAddress);
router.post(
  "/default/:id",
  verifyAndAuthorization,
  addressController.setDetaultAddress
);

router.delete("/:id", verifyAndAuthorization, addressController.deleteAddress);
router.get(
  "/default",
  verifyAndAuthorization,
  addressController.getDefaultAddress
);
router.get("/", verifyAndAuthorization, addressController.getUserAddresses);
router.put("/:id", verifyAndAuthorization, addressController.updateAddress);

module.exports = router;
