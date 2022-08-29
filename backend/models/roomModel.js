const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const crypto = require('crypto')

const roomSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
      
    },
    price: {
        type: Number,
        required: true
      
    },
    maxPeople: {
        type: Number,
        required: true
      
    },
    desc: {
        type: String,
        required: true
      
    },
    roomNumbers: [
        {
            number : Number,
            unavailableDates : {
                type : [Date]
            }
        }
    ]
 

},{timestamps : true})


module.exports = mongoose.model('Room', roomSchema)