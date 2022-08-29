const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        require : true
    },
    email: {
        type: String,
        required: [true, 'Please enter your email address'],
        validate: [validator.isEmail, 'Please enter a valid email'],
        unique: true,
        index  : true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [8, 'Your password should be greater then 8 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user',
       
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    googleId:{
        type : String,
  
    },


})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//JWT Token
userSchema.methods.getJwtToken = function () {
    return JWT.sign({ id: this._id , role : this.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// //Compare passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema)