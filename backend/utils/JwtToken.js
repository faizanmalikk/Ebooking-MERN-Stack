

const sendToken = (user, statusCode, res) => {

    const token = user.getJwtToken()

    //Options for cookies
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    const {password ,...otherDetails} = user._doc


    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user:otherDetails,
    })

}

module.exports = sendToken