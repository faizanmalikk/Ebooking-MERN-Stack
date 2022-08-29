const User = require('../models/userModel')
const ErrorHander = require('../utils/ErrorHander')
const asyncErrors = require('../middleware/asyncErrors')
const sendToken = require('../utils/JwtToken');
const cloudinary = require('cloudinary')


//Resgister User
exports.resgisterUser = asyncErrors(async (req, res, next) => {

    if (req.body.googleId) {

        const { email } = req.body

        let profile = {
            public_id: 'google',
            url: req.body.avatar
        }

        req.body.avatar = profile

        const users = await User.findOne({ email })
        if (users) {
            sendToken(users, 200, res)
        } else {

            const user = await User.create(req.body)
            sendToken(user, 201, res)
        }

    } else {

        if (req.body.avatar) {
            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: 'Ecommerce',
            })

            let profile = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }

            req.body.avatar = profile

            const user = await User.create(req.body)

            sendToken(user, 201, res)
        }

        else {

            let profile = {
                public_id: Math.random(),
                url: 'https://res.cloudinary.com/doytf8ce3/image/upload/v1655402904/Ecommerce/ebg1xapvqiyukrecfqwe.png'
            }

            req.body.avatar = profile

            const user = await User.create(req.body)

            sendToken(user, 201, res)

        }

    }

})

//Login a user
exports.loginUser = asyncErrors(async (req, res, next) => {
    const { email, password: pass } = req.body;

    //Checking if user has given email and pass both 
    if (!email || !pass) {
        return next(new ErrorHander('Please enter email and password', 400))
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return next(new ErrorHander('Invalid email or password', 401))

    }

    const isPasswordMatched = await user.comparePassword(pass);

    if (!isPasswordMatched) {
        return next(new ErrorHander('Invalid email or password', 401))

    }

    sendToken(user, 200, res)
})

//Get logged in user details

exports.getLoggedInUserDetails = asyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })
})

// Get User Details

exports.getUserDetails = asyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    res.status(200).json({
        success: true,
        user
    })
})

// Get All User Details

exports.getAllUsers = asyncErrors(async (req, res, next) => {
    const user = await User.find()
    res.status(200).json({
        success: true,
        user
    })
})

//Update User 
exports.updateUser = asyncErrors(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    if (req.body.avatar) {

        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id
        const url = user.avatar.url

        if (url !== 'https://res.cloudinary.com/doytf8ce3/image/upload/v1655402904/Ecommerce/ebg1xapvqiyukrecfqwe.png') {
            await cloudinary.v2.uploader.destroy(imageId)
        }

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'Ecommerce',
        })
        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,

    })

    res.status(201).json({
        success: true,
        user
    })

})
//Delete User 
exports.deleteUser = asyncErrors(async (req, res, next) => {


    const isUser = await User.findById(req.params.id)

    if (!isUser) {
        return next(new ErrorHander('User not found', 404))
    }

    const url = isUser.avatar.url
    const imageId = isUser.avatar.public_id

    if (imageId !== 'google' && url !== 'https://res.cloudinary.com/doytf8ce3/image/upload/v1655402904/Ecommerce/ebg1xapvqiyukrecfqwe.png') {
        await cloudinary.v2.uploader.destroy(imageId)
    }

    await isUser.remove()

    res.status(201).json({
        success: true,
        message: 'User deleted Successfully'
    })

})

//Logout User

exports.logoutUser = asyncErrors(async (req, res, next) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})

//Update user password
exports.updatePassword = asyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHander('Old password in incorrect', 400))

    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHander('Password does not match', 400))
    }

    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res)
})