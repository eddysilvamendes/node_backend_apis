//Create a instance of model
const Restaurant = require('../models/Restaurant')

module.exports ={
    addRestaurant: async(request,response)=>{
        const newRestaurant = new Restaurant(request.body)
        try {
            await newRestaurant.save()
            response.status(201).json({status:true,message:'Restaurant successfully created'})
        } catch (error) {
            response.status(500).json({status:false,message:error.message})
        }
    },
    serviceAvailible: async (request,response)=>{
        const restaurant_id = request.params;

        try {
            const restaurant = await Restaurant.findById(restaurant_id)
            if(!restaurant){
                return response.status(404).json({status:false,message:'Restaurant not found'})
            }
            restaurant.isAvailable = !restaurant.isAvailable
            await restaurant.save()
            response.status(200).json({status:true,message:'Availability Restaurant successfully toggled',isAvailable:restaurant.isAvailable})
        } catch (error) {
            response.status(500).json({status:false,message:error.message})
        }
    },
    deleteRestaurant: async(request,response)=>{
        const restaurant_id = request.params.id;
        try {
            const restaurant = await Restaurant.findById(restaurant_id)
            if(!restaurant){
                return response.status(404).json({status:false,message:'Restaurant not found'})
            }
            await Restaurant.findByIdAndDelete(restaurant_id)
            response.status(200).json({status:true,message:'Restaurant successfully deleted'})
        } catch (error) {
            response.status(500).json({status:false,message:error.message})
        }
    },
    getRestaurant: async(request,response)=>{
        const restaurant_id = request.params.id;
        try {
            const restaurant = await Restaurant.findById(restaurant_id)
            if(!restaurant){
                return response.status(404).json({status:false,message:'Restaurant not found'})
            }
            response.status(200).json(restaurant)
        } catch (error) {
            response.status(500).json({status:false,message:error.message})
        }
    },
    getRandomRestaurant: async(request,response)=>{
        try {
            let randomRestaurant = [];
            if(request.params.code){
                randomRestaurant = await Restaurant.aggregate([
                    {$match: {code:request.params.code}},
                    {$sample:{size:5}},
                    {$project:{__v:0}},
                ]);
            }
            if(!randomRestaurant){
                randomRestaurant = await Restaurant.aggregate([
                    {$sample:{size:5}},
                    {$project:{__v:0}},
                ]);
            }
            if (randomRestaurant.length){
                response.status(200).json(randomRestaurant)
            }
        } catch (error) {
            response.status(500).json({status:false,message:error.message})
        }
    }
}