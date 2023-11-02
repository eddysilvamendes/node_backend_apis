const mongoose = require('mongoose')

const CategorieSchema = new mongoose.Schema({
   title: {type: String, required:true},
   value: {type: String, required:true},
   imageUrl: {type: String, required:true},
},{timestamps:false});

module.exports = mongoose.model('Category',CategorieSchema)