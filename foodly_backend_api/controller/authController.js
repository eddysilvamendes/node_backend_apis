//Create a instance of model
const User = require('../models/User')
//Create a instance of crypto-js
const CryptoJS = require('crypto-js')
//Create a instance of jsonwebtoken
const jwt = require('jsonwebtoken')
//create a instance of firebase admin
const admin = require('firebase-admin')

//Export the function
module.exports = {
    //Function async to create user
    createUser: async (request,response)=>{
        const user = request.body;
        try {
            await admin.auth().getUserByEmail(user.email);
            response.status(400).json({
                message:"Email already registred",
            })
        } catch (error) {
            if(error.code ==='auth/user-not-found'){
                try {
                    const userResponse = await admin.auth().createUser({
                        email:user.email,
                        password:user.password,
                        emailVerified:false,
                        disabled:false,
                    })
                    const newUser = new User({
                        username:user.username,
                        email: user.email,
                        password: CryptoJS.AES.encrypt(user.password,process.env.SECRET).toString(),
                        uid: userResponse.uid,
                        userType: 'Client'
                    })
                    await newUser.save()
                    response.status(201).json({
                        status:true,
                    })
                } catch (error) {
                    response.status(500).json({
                        status:false,
                        error:error.message,
                    })
                }
            }
        }
    },
     //Function async to login user
    loginUser: async (request,response)=>{
        try {
            const user = await User.findOne({email:request.body.email},{__v:0,createdAt:0,updatedAt:0})
            !user && response.status(401).json('Wrong Credentials')

            const decryptedpassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
            const decrypted = decryptedpassword.toString(CryptoJS.enc.Utf8);

            decrypted !== request.body.password && response.status(401).json('Wrong Password')
            const userToken = jwt.sign({
                id: user._id,userType:user.userType,email:user.email
            }, process.env.JWT_SEC, {expiresIn:'21d'});

            const {password,email,...others} = user._doc
            response.status(200).json({...others,userToken})
            
        } catch (error) {
            response.status(500).json({
                status:false,
                error:error.message,
            })
        }
    }
    //

}
