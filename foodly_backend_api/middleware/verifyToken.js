const jwt = require('jsonwebtoken')

const verifyToken = (request,response,next)=>{
    const authHeader = request.headers.authorization;

    if(authHeader){
        // Remove token space and bearer indicator
        // split the space and get the index 1, bearer is index 0 so the token is index 1
        const token = authHeader.split(' ')[1]
        jwt.verify(token,process.env.JWT_SEC, async (err,user)=>{
            if(err){
                response.status(403).json({
                    status:false,
                    message:err.message
                })
            }
            // if ok get the user
            request.user = user;
            next();
        })
    }
}

const verifyAndAuthorization = (request,response,next)=>{
    verifyToken(request, response, ()=>{
        if (request.user.userType ==='Client' ||request.user.userType ==='Vendor' 
        ||request.user.userType ==='Admin' || request.user.userType ==='Driver' ){
            next();
        }else{
            response.status(403).json({
                status:false,
                message:'You are not authorize'
            })
        }
    })
}

const verifyVendor = (request,response,next)=>{
    verifyToken(request, response, ()=>{
        if (request.user.userType ==='Vendor' ||request.user.userType ==='Admin' ){
            next();
        }else{
            response.status(403).json({
                status:false,
                message:'You are not authorize'
            })
        }
    })
}

const verifyDriver = (request,response,next)=>{
    verifyToken(request, response, ()=>{
        if (request.user.userType ==='Driver' || request.user.userType ==='Admin'  ){
            next();
        }else{
            response.status(403).json({
                status:false,
                message:'You are not authorize'
            })
        }
    })
}

const verifyAdmin = (request,response,next)=>{
    verifyToken(request, response, ()=>{
        if (request.user.userType ==='Admin'  ){
            next();
        }else{
            response.status(403).json({
                status:false,
                message:'You are not authorize'
            })
        }
    })
}

module.exports = {verifyToken,verifyAndAuthorization,verifyVendor,verifyDriver,verifyAdmin}