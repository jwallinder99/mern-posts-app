const express = require('express')
const router = express.Router()
const { checkJWToken } = require('./middleware')
const { create, deletePost, editPost } = require('../controllers/post.controller')

//route for adding a new post to the db
router.post('/addPost',checkJWToken, async(req, res) => {
    try {
        await create(req, res)
    } catch(error){
        console.log(error)
        res.status(500).json({message: "Error occurred while trying to add new post"})
    }
})

//route for deleting logged in user's post
router.delete('/:id',checkJWToken, async(req, res) => {
    try{
        await deletePost(req, res)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error occurred while trying to delete post"})
    }
})

//route for editing a post
router.put('/:id',checkJWToken, async(req,res) => {
    try {
        await editPost(req, res)
    } catch {
        console.log(error)
        res.status(500).json({message: "Error occurred while trying to edit post"})
    }
})
module.exports = router; 