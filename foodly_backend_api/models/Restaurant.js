const mongoose = require('mongoose')

const RestaurantSchema = new mongoose.Schema({
    title: {type: String, required:true},
    time: {type: String, required:true},
    imageUrl:{type: String, required:true},
    food:{type: Array},
    pickup:{type: Boolean, required:false,default:true},
    delivery:{type: Boolean, required:false,default:true},
    owner:{type: String, required:true},
    isAvailable:{type: Boolean, default:true},
    code:{type: String, required:true},
    logoUrl:{
        type: String,
        required: true,
        default: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    rationg:{type: Number, min:1 , max: 5},
    rationgCount:{type: String},
    coord:{
        id:{type: String, required:true},
        latitude:{type: Number, required:true},
        longitude:{type: Number, required:true},
        latitudeDelta:{type: Number, required:true},
        longitudeDelta:{type: Number, required:true},
        address:{type: String, required:true},
        title:{type: String, required:true}
        }
},{timestamps:true});

module.exports = mongoose.model('Restaurant',RestaurantSchema)