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
    }
}