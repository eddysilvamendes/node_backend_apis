const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {type: String, required:true},
    email: {type: String, required:True,unique:true},
    uid:{type: String, required:true,unique:true},
    password:{type: String, required:true},
    address:{type: Array, required:false},
    phone:{type: String, required:false},
    userType:{type: String, required:true, default: 'Client', enum:['Admin','Driver','Client','Vendor']},
    profile:{
        type: String,
        required: true,
        default: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
},{timestamps:true});

module.exports = mongoose.model('User',UserSchema)