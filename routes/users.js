var express = require('express');
var router = express.Router();
//get jwt module
let jwt = require("jsonwebtoken")
//import middleware
const { checkUsername, checkJWToken } = require('./middleware')
//import create controller from controller file to make a new user document
const { create, findAllPosts } = require('../controllers/user.controller')
//require user model to use mongoose model method in login route
const User = require("../models/userModel")
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// /register post route to add a new user to the database
//uses the checkUsername middleware function to check if username is available
router.post("/register", checkUsername, async (req, res) => {
  try {
    //await create function from user controller file, passing req and response as parameters
    await create(req, res)
  } catch(error) {
    console.log(error)
    res.status(500).json({message: "error occurred while trying to add user"})
  }
})  

router.post("/login", async (req, res) => {
  //get username and password from request body
  const { username, password } = req.body;
  //find a user with the given username using mongoose findOne method on user model
  const user = await User.findOne({username: username}).exec()
  //if no user matches or the password property of the user does not equal the password of the request
  if(!user || user.password !== password) {
    //send 401 status
    res.status(401).send({message: "username or password do not match"})
  } else {
    //else if password and username match, generate jwt token
    let jwtoken = jwt.sign(
      {
        username: username,
        password: password,
        isAdmin: user.isAdmin
      },
      'secretKey',
      {algorithm: 'HS256'}
    )
    res.status(200).send({'token': jwtoken})
  }
})

//route to get posts for feed
router.get('/getPosts', checkJWToken,  async (req, res) => {
  try {
    console.log('Before fetching posts')
    //await funcAllPosts function from controller file, passing request and response as parameters
    await findAllPosts(req, res)
  } catch (error) {
    console.log("Error occurred while getting posts" + error)
    return res.status(500).json({message: 'Error getting posts :('})
  }
})

module.exports = router;


