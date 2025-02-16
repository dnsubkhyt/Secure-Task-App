const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/auth')

router.get('/signup', (req, res) => {
    res.render('signup')
})
router.post('/signup', userController.signup)

router.get('/login', (req, res) => {
    res.render('login')
})
router.post('/login', userController.login)

router.get('/me', authMiddleware, userController.getUserInfo)

router.delete('/me', authMiddleware, userController.closeAccount )

module.exports = router
