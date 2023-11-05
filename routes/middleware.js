//get user model
const User = require("../models/userModel")
//get jwt module
let jwt = require("jsonwebtoken")


//function to check if username exists in database

const checkUsername = async (req, res, next) => {
    try {
        //get username from the request
        const { username } = req.body;
        console.log(username)
        //use mongoose findOne method on model and pass the username from request as argument to find user with that username
        const user = await User.findOne({username: username}).exec()
        //if the query from the mongoose method is truthy
        if(user) {
            //return out of the middleware with a 401 response, indicating someone has already choosen the username
        return res.status(401).json({
            message: "user already exists"
        })
        }
        //continue to next piece of middleware
        next()
    } catch (error) {
        console.log(error)
    }
}

//function to check json web token
const checkJWToken = (req, res, next) => {
    //get auth header from request headers
    const authHeader = req.headers['authorization']
    //if they exist
    if(authHeader) {
        //get token from authheader
        let token = authHeader.split(' ')[1]
        //verify token
        jwt.verify(token, "secretKey", (err, data) => {
            if(err) {
                return next(err)
            } else {
                req.username = data.username;
                req.password = data.password;
                next();
            }
        })
    } else {
        res.send({message: "No token attached to request"})
    }
}



module.exports = {
    checkUsername,
    checkJWToken
}