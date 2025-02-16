const User = require('../models/userModel')
const {validateUserSchema} = require('../config/joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
    const {name, email, password, role} = req.body
    try{
        const userIn = {name, email, password, role}
        const {error} = validateUserSchema(userIn)
        
        if(error) return res.render('signup', {error: error.details[0].message}) 

        const userExists = await User.findOne({email})
        if (userExists) return res.status(400).json({message: 'User already exists.'})

        const hashPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            createdAt: Date.now()
        })
        
        await newUser.save()

        res.redirect('/login')
    }   
    catch (err){
        console.error(err);

        res.render('signup', { error: 'Server error. Please try again later.' })

    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        return res.render('login',{ error: 'Please provide both email and password' });
    }

    try {

        const userExists = await User.findOne({email})
        if (!userExists) return res.render('login', { error: 'User not found' });

        const isMatch = await bcrypt.compare(password, userExists.password)
        if (!isMatch) return res.render('login', { error: 'Invalid credentials' });
            
        const token = jwt.sign({user_id: userExists._id, role: userExists.role},
            process.env.JWT_SECRET, 
            {expiresIn: '1h'}
        )
        
        res.send({ message: 'Log in successful!', token: token });
    }
    catch (err){
        console.error(err)

        res.render('login', { error: 'Server error. Please try again later.' });
    }
}

exports.getUserInfo = async (req, res) => {
    try {
        const _id =  req.userId
        if (!_id) return res.status(404).json({ message: 'Please provide the credentials' });
        
        const user = await User.findById(_id).populate('purchase_history');
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        res.render('profile',{
            name: user.name,
            email: user.email,
            address: user.address,
            purchase_history: user.purchase_history,
            member_since: user.createdAt
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}

exports.closeAccount = async (req, res) => {
    try {
        const _id =  req.userId
        if(!_id) return res.status(404).json({message: 'Please provide the credentials'})
        
        const user = await User.findOne({_id})
        if (!user) return res.status(404).send({message: 'User not found'})
    
        await User.deleteOne({_id})
    
        res.json({message: 'Your account is closed'})
    } catch (err) {
        res.status(500).json({message: 'Server error', err})
    }
}