const Category = require('../models/Categories');
module.exports = {
    createCategory: async (request,response)=>{
        const newCategory =  new Category(request.body)
        try {
            await newCategory.save();
            response.status(201).json({status:true,message:'Category saved successfully'})
        } catch (error) {
            response.status(500).json({status:false,message:error.message})
        }
    },
    updateCategory: async (request,response)=>{
        const id = request.params.id;
        const {title,value,imageUrl}=request.body;
        try {
            const updateCategory = await Category.findByIdAndUpdate(id,{
                title:title,
                value:value,
                imageUrl:imageUrl
            }, {new:true})
            if(!updateCategory){
                response.status(404).json({status:false,message:'Category not found'})
            }
            response.status(200).json({status:true,message:'Category updated successfully',updateCategory:updateCategory})
        } catch (error) {
            response.status(500).json({status:false,message:error.message})
        }
    },
    deleteCategory: async (request,response)=>{
        const id = request.params.id;
        try {
            const category = await Category.findById(id);
            if(!category){
                response.status(404).json({status:false,message:'Category not found'})
            }
            await Category.findByIdAndDelete(id);
            response.status(200).json({status:true,message:'Category deleted successfully',updateCategory:updateCategory})
        } catch (error) {
            response.status(500).json({status:false,message:error.message})
        }
    },
}