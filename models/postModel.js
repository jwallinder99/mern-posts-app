const mongoose = require('mongoose')

//Schema for post documents that will be stored in the db

let PostSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    comments: {
        type: Array,
        reuired: true
    }
})

module.exports = mongoose.model("Post", PostSchema)