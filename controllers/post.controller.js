const PostModel = require('../models/postModel')

//function to create a new post document
exports.create = async(req, res) => {
    //destructure properties of req.body
    const { username, content } = req.body
    //make a new post document using the imported model
    let newPost = new PostModel({
        username: username,
        content: content,
        comments: []
    })
    //use save mongoose method on newPost object to save document to db
    try {
        const savedPost = await newPost.save()
        console.log(savedPost)
        return res.status(200).send({message: "Post added successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: "Some error occurred while trying to make new post"})
    }
}

//function to delete a document
exports.deletePost = async(req, res) => {
    //get id from request parameters
    const postId = req.params.id
    try {//use findByIdAnd Delete mongoose method to delete post with given post_id
        const result = await PostModel.findByIdAndDelete(postId)
        //if result is not truthy
        if(!result) {
            res.status(404).json({message: "post not found"})
            //else send 200 response
        } else {
            res.status(200).json({message: "post deleted successfully"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error occurred while interacting with db"})
    }
}

//function to edit a post 
exports.editPost = async(req, res) => {
    //get id parameter from request
    const postId = req.params.id
    //get body from request
    const newPost = req.body

    try {//use mongoose findByUpdate method on PostModel, passing postId, and newPost from body of request as parameters
        const updatedPost = await PostModel.findByIdAndUpdate(postId, newPost, {new: true})
        //if updated post not truthy
        if(!updatedPost) {
            res.status(404).json({message: "User not found"})
        } else {
            //car was updated successfully
            res.status(200).json({message: "Post updated successfully"})
        }
    } catch (error) {
        res.status(500).json({message: "Error occurred while trying to edit post"})
    }
}