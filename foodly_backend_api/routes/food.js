const router = require("express").Router();
const foodController = require("../controller/foodController");
const { verifyVendor } = require("../middleware/verifyToken");

router.post("/", foodController.addFood);
router.post("/tags/:id", foodController.addFoodTag);
router.post("/type/:id", foodController.addFoodType);
router.get("/:id", foodController.getFoodById);
router.get("/:category/:code", foodController.getRandomByCategoryAndCode);
router.get("/:code", foodController.getRandomFoodByCode);
router.get("/restaurant/:restaurantId", foodController.getFoodByRestaurant);

router.delete("/:id", foodController.deleteFoodById);
router.patch("/:id", foodController.foodAvailability);

module.exports = router;
