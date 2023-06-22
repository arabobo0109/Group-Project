const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail} = require('validator'); // isEmail is a function that comes from the validator package


// keyword 'new' means we are working with a class so we know we can use 'this'
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:[true, 'First Name is required']
    },
    lastName: {
        type: String,
        required:[true, 'Last Name is required']
    },
    email: {
        type: String,
        required:[true, 'Email is required'],
        validate:[isEmail, 'Invalid Email'] // If email isnt valid, this validator will send back the string
    },
    password: {
        type: String,
        required:[true, 'Password is required'],
        minLength:[8, 'Password must be atleast 8 characters']
    }
}, {timestamps:true})

//  Middleware (we are familiar, app.use in server.js are middleware)

// virtual field is temporary and not added to the databse, that is why it is not in our Schema blueprint. In this case it temporarily appears to confirm password, then disappears. Since our schema is a class, "this" below refers to this instance of that class, or this document.
UserSchema.virtual('confirmPassword')
    .get(() => this.confirmPassword)
    .set(value => this.confirmPassword = value )

// Above is just setting the confirmPassword virtual field, now we have to check if password and confirm password are equal


UserSchema.pre('validate', function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'Passwords dont match')
    }
    next();
})
//This means previous to saving anything to the database, takes in 2 arguments. First argument is previous to what, here it means previous to validating ('validate'). Then the function we want to run after.
// Prior to entering to database (validating), confirm if passwords match. If they do, execute the NEXT() function in line (order). 



UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

// This means previous to saving ('save')
// Then we are going to hash this.password 10 times, run it through the hash function 10 times
// Then we are going to take the hash, and set this.password equal to hash
// Then run the next function, save to database

module.exports = mongoose.model('User', UserSchema)