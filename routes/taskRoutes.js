const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const roleBasedAccessControl = require('../middleware/roleBasedAccessControl')
const taskController = require('../controllers/taskController')

router.get('/create', authMiddleware, taskController.showTaskForm)

router.post('/', authMiddleware, taskController.createTask);

// router.get('/', authMiddleware, taskController.getTasksWithFilter)

// router.get('/my', authMiddleware, taskController.getUserTasks)

// router.get('/admin', authMiddleware, roleBasedAccessControl(['admin']), taskController.adminTask)

module.exports = router