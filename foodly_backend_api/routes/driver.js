const router = require("express").Router();
const driverController = require("../controller/driverController");
const {
  verifyAndAuthorization,
  verifyDriver,
} = require("../middleware/verifyToken");

router.post("/", verifyAndAuthorization, driverController.registerDriver);
router.patch("/", verifyDriver, driverController.setDriverAvailability);

module.exports = router;
