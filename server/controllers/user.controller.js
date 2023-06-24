const User = require('../models/user.model');
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports = {
    registerUser: async (req, res) => {
        try{
            // Check if email entered in the form already exists in the database
            // PotentialUser will be the response/results from the query
            // Whenever we write a database query we will use await and set it up like below
            const potentialUser = await User.findOne({email: req.body.email})
            if(potentialUser){
                res.status(400).json({message: 'That email already exists, please login'})
            }else{
                // create user
                const newUser = await User.create(req.body);

                // Generates a usertoken storing what we pass in (id, email of newly created user) that we want to encode inside the web token. Encode sensitive information that is only decoded by env file secret key
                const userToken = jwt.sign({_id: newUser._id, email: newUser.email}, secret, {expiresIn:'2h'})
                
                // sending user data back to the client
                res.status(201).cookie('userToken', userToken, {httpOnly:true, maxAge:2 * 60 * 60 * 1000}).json(newUser);
            }
        }
        catch(err){
            res.status(400).json({error: err})
        }
    },

    loginUser: async (req, res) => {
        try{
            // check if the user already exists
            const user = await User.findOne({email: req.body.email})
            if(user){
                // check if the password entered matches the password in the DB for that email specifically the hash, compare function runs everything behind scene and returns a boolean to passwordsMatch
                const passwordsMatch = await bcrypt.compare(req.body.password, user.password)
                if(passwordsMatch){
                    // generate our userToken 
                    const userToken = jwt.sign({_id: user._id, email: user.email}, secret, {expiresIn:'2h'})
                    // log the user in
                    res.status(201).cookie('userToken', userToken, {httpOnly:true, maxAge:2 * 60 * 60 * 1000}).json(user);
                }
                else{
                    // if email does exist but incorrect password
                    res.status(400).json({message: 'Invalid email/password'})
                }
            }
            // if the user doesnt exist, our message says email and password so hacker doesnt know which is right
            else{
                res.status(400).json({message: 'Invalid email/password'})
            }
        }
        catch(err){
            res.status(400).json({error: err})
        }
    },

    

    logoutUser: (req, res) => {
        res.clearCookie('userToken').json({message: 'You have logged out'})
    },

    getLogged: async (req, res) => {
        try {
            const user = jwt.verify(req.cookies.userToken, SECRET);
            const currentUser = await Model.findOne({ _id: user._id });
            res.json(currentUser);
        } catch (error) {
            res.status(400).json({ errors: 'failed to get logged in user' })
        }
    }
}