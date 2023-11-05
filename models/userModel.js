const mongoose = require('mongoose')

//schema for user documents that will be stored in the db
//isAdmin propery set to false by default for all users so they don't have admin rights
let UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', UserSchema)