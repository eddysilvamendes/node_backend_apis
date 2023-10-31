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
    }
}