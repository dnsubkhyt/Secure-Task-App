const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true, min: 10, max: 500},
    status: {type: String, required: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true},    
    createdAt: {type: Date, default:Date.now}
})

const taskModel = mongoose.model('task', taskSchema)

module.exports  = taskModel