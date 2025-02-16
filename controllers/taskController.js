const {validateProductSchema} = require('../config/joi')
const Task = require('../models/taskModel')


exports.showTaskForm = (req, res) => {
    res.render('taskForm')
}


exports.createTask = async (req, res) => {
    const { title, description, status } = req.body
    const task = new Task({
        title,
        description,
        status,
        userId: req.userId, 
    })
    try {
        await task.save()
        res.redirect('/tasks')
    } catch (err) {
        res.status(500).json({ message: 'Error creating task' })
    }
}

// exports.adminTask = async (req ,res)=>{
//     try {
//         const tasks = await Task.find();
//         res.status(200).json(tasks)
//     } catch (err) {
//         res.status(500).json({ message: 'Error retrieving tasks' })
//     }
// }

// exports.getUserTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find({ userId: req.userId })
//         res.status(200).json(tasks)
//     } catch (err) {
//         res.status(500).json({ message: 'Error retrieving tasks for this user' })
//     }
// }

// exports.getTasksWithFilter = async (req, res) => {
//     const status = req.query.status || ''
//     let tasks = []
//     let userIsLoggedIn = req.userId ? true : false

//     try {
//         if (status) {
//             tasks = await Task.find({status: status})
//         } else {
//             tasks = await Task.find()
//         }
//         res.render('home', {tasks, status,userIsLoggedIn })
//     } catch (err) {
//         res.status(500).json({ message: 'Error retrieving tasks' })
//     }
// }
