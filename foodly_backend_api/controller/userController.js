//Create a instance of model
const User = require('../models/User')
//Create a instance of crypto-js
const CryptoJS = require('crypto-js')
//Create a instance of jsonwebtoken
const jwt = require('jsonwebtoken')
//create a instance of firebase admin
const admin = require('firebase-admin')




module.exports = {
    getUser: async(request,response)=>{
        const user_id = request.user.id
        try {
            //Get user id and exclude the rest
            const user = await User.findById({_id:user_id},{password:0,__v:0,createdAt:0,updatedAt:0})
            response.status(200).json(user)
        } catch (error) {
            response.status(500).json({
                status:false,
                message:'Error retrieving user',
                error:error.message
            })
        }
    },
    deleteUser: async (request,response)=>{
        const user_id = request.user.id
        try {
            await User.findByIdAndDelete(user_id)
            response.status(200).json({
                status:true,
                message:'User deleted successfully'
            })
        } catch (error) {
            response.status(500).json({message:error.message})
        }
    },
    updateUser: async (request,response)=>{
        const user_id = request.user.id
        try {
            const updatedUser = await User.findByIdAndUpdate(user_id,{
                $set:request.body
            },{new:true})
            response.status(200).json({
                status:true,
                message:'User Updated successfully',
                user:updatedUser
            })
        } catch (error) {
            response.status(500).json({message:error.message})
        }
    }
}