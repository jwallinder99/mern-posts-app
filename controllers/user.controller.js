//get user model and post model for mongoose methods
const UserModel = require('../models/userModel');
const PostModel = require('../models/postModel');


//function to create a new user document
exports.create = async (req, res) => {
    //destructure properties of req.body
    const { username, password } = req.body
    //make a new user using the imported user model
    let newUser = new UserModel({
        username: username,
        password: password
    })

    //save user model to database with save method
    try {
        const savedUser = await newUser.save()
        console.log(savedUser)
        res.status(200).send({message: "user added successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send({message: "some error occurred while creating the user"})
    }
}

//function to get posts 
exports.findAllPosts = async (req, res) => {
    try {
        //use find mongoose method on PostModel document to find all documents 
        const posts = await PostModel.find()
        //send back documents in posts variable
        res.json(posts)
    } catch (error) {
        console.log(error)
        return res.json({message: "something went wrong when getting posts"})
    }
}