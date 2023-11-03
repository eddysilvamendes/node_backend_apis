//Create a instance of model
const Food = require("../models/Food");

module.exports = {
  addFood: async (request, response) => {
    const newFood = new Food(request.body);

    try {
      await newFood.save();
      response
        .status(201)
        .json({ status: true, message: "Food added successfully" });
    } catch (error) {
      response.status(500).json({ status: false, message: error.message });
    }
  },
  getFoodById: async (request, response) => {
    const foodId = request.params.id;
    try {
      const food = await Food.findById(foodId);
      if (!food) {
        response
          .status(404)
          .json({ status: false, message: "Food not found!" });
      }
      response.status(200).json(food);
    } catch (error) {
      response.status(500).json({ status: false, message: error.message });
    }
  },
  getFoodByRestaurant: async (request, response) => {
    const restaurantId = request.params.restaurantId;
    try {
      const foods = await Food.find({
        restaurant: restaurantId,
      });
      if (!foods || foods.length === 0) {
        return response
          .status(404)
          .json({ satus: false, message: "No food item found" });
      }
      response.status(200).json(foods);
    } catch (error) {
      response.status(500).json({ satus: false, message: error.message });
    }
  },
  deleteFoodById: async (request, response) => {
    const food_id = request.params.id;

    try {
      const food = await Food.findById(food_id);
      if (!food) {
        return response
          .status(404)
          .json({ satus: false, message: "No food item found" });
      }
      await Food.findByIdAndDelete(food_id);
      response
        .status(200)
        .json({ satus: true, message: "Food deleted successfully!" });
    } catch (error) {
      response.status(500).json({ satus: false, message: error.message });
    }
  },
  foodAvailability: async (request, response) => {
    const food_id = request.params.id;

    try {
      const food = await Food.findById(food_id);
      if (!food) {
        response
          .status(404)
          .json({ satus: false, message: "Food item not found" });
      }
      food.isAvailable = !food.isAvailable;
      await food.save();
      response
        .status(200)
        .json({
          satus: true,
          message: "Food availability successfully toggled!",
        });
    } catch (error) {
      response.status(500).json({ satus: false, message: error.message });
    }
  },
  updateFoodById: async (request, response) => {
    const food_id = request.params.id;

    try {
      const food = await Food.findByIdAndUpdate(food_id, request.body, {
        new: true,
        runValidators: true,
      });
      if (!food) {
        response
          .status(404)
          .json({ satus: false, message: "Food item not updated" });
      }
      response
        .status(200)
        .json({
          satus: true,
          message: "Food updated successfully!",
          food: food,
        });
    } catch (error) {
      response.status(500).json({ satus: false, message: error.message });
    }
  },
  addFoodTag: async (request, response) => {
    const food_id = request.params.id;
    const { tag } = request.body;
    try {
      const food = await Food.findById(food_id);
      if (!food) {
        response
          .status(404)
          .json({ satus: false, message: "Food item not updated" });
      }
      if (food.foodTags.includes(tag)) {
        response
          .status(400)
          .json({ satus: false, message: "Tag already exist" });
      }
      food.foodTags.push(tag);
      await food.save();
      response
        .status(200)
        .json({ satus: true, message: "Food tag successfully updated" });
    } catch (error) {
      response.status(500).json({ satus: false, message: error.message });
    }
  },
  getRandomFoodByCode: async (request, response) => {
    try {
      let random_food_item = await Food.aggregate([
        { $match: { code: request.params.code } },
        { $sample: { size: 5 } },
        { $project: { _id: 0 } },
      ]);
      response.status(200).json(random_food_item);
    } catch (error) {
      response.status(500).json({ satus: false, message: error.message });
    }
  },
  addFoodType: async (request, response) => {
    const food_id = request.params.id;
    const food_type = request.body;
    try {
      const food = await Food.findById(food_id);
      if (!food) {
        return response
          .status(404)
          .json({ satus: false, message: "Food item not updated" });
      }
      if (food.foodType.includes(food_type)) {
        response
          .status(400)
          .json({ satus: false, message: "Food type already exist" });
      }
      food.foodType.push(food_type);
      await food.save();
      response
        .status(200)
        .json({ satus: true, message: "Food type successfully added" });
    } catch (error) {
      response.status(500).json({ satus: false, message: error.message });
    }
  },
  getRandomByCategoryAndCode: async (request, response) => {
    const { category, code } = request.params;
    try {
      let foods = await Food.aggregate([
        { $match: { category: category, code: code } },
        { $sample: { size: 10 } },
      ]);
      if (!foods || foods.length === 0) {
        foods = await Food.aggregate([
          { $match: { code: code } },
          { $sample: { size: 10 } },
        ]);
      } else {
        foods = await Food.aggregate([{ $sample: { size: 10 } }]);
      }
      response.status(200).json(foods);
    } catch (error) {
      response.status(500).json({ status: false, message: error.message });
    }
  },
};
