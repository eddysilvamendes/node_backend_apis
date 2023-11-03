const router = require("express").Router();
const foodController = require("../controller/foodController");
const { verifyVendor } = require("../middleware/verifyToken");

router.post("/", verifyVendor, foodController.addFood);
router.post("/tags/:id", verifyVendor, foodController.addFoodTag);
router.post("/type/:id", verifyVendor, foodController.addFoodType);
router.get("/:id", foodController.getFoodById);
router.get("/:category/:code", foodController.getRandomByCategoryAndCode);
router.get("/:code", foodController.getRandomFoodByCode);
router.get("/restaurant/:restaurantId", foodController.getFoodByRestaurant);

router.delete("/:id", verifyVendor, verifyAdmin, foodController.deleteFoodById);
router.patch("/:id", verifyVendor, foodController.foodAvailability);

module.exports = router;
