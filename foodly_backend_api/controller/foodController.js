//Create a instance of model
const Food = require('../models/Food')


module.exports = {
    addFood:async (request,response) => {
        const newFood = new Food(request.body)

        try {
            await newFood.save();
            response.status(201).json({status:true,message:'Food added successfully'})
        } catch (error) {
            response.status(500).json({status:false,message:error.message})
        }
    },
    getFoodById: async (request,response)=>{
        const foodId = request.params.id;
        try {
            const food = await Food.findById(foodId)
            if(!food){
                response.status(404).json({status:false,message:'Food not found!'})
            }
            response.status(200).json(food)
        } catch (error) {
            response.status(500).json({status:false,message:error.message})
        }
    },
    getFoodByRestaurant: async (request,response) => {
        const restaurantId = request.params.restaurantId;
        try {
            const foods = await Food.find({
                restaurant:restaurantId
            });
            if(!foods || foods.length === 0){
                return response.status(404).json({satus:false,message:'No food item found'})
            }
            response.status(200).json(foods)
        } catch (error) {
            response.status(500).json({satus:false,message:error.message})
        }
    }

}