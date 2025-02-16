const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: {type: String, 
        enum: ['admin', 'user'],
        required: true},    
    createdAt: {type: Date, default:Date.now}
})

const userModel = mongoose.model('user', userSchema)

module.exports  = userModel