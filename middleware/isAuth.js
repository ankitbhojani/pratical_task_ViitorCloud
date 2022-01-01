const jwt = require('jwt-then');
const User = require('../models/User');
const { Container } = require('typedi')
const dotenv = require('dotenv').config();

module.exports = async (req,res,next) => {
    try{
        if(!req.headers.authorization){
            res.json({
                status:401,
                message:"Invalid Token"
            })
        }
        const token = req.headers.authorization.split(" ")[1];
        const payload = await jwt.verify(token,dotenv.parsed.JWT_SALT);
        const userVerified = await User.findOne({_id:payload._id})
        Container.set('auth-token', userVerified);
        // if(userVerified.is_verified == 0){
        //     return {
        //         status:400,
        //         message:"Please verify your email"
        //     }
        // }
        req.payload = payload;
        next();
    } catch(error){
        res.json({
            status:401,
            message:"Invalid Token"
        })
    }
}