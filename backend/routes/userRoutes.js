const express = require('express');
const { resgisterUser, loginUser, getLoggedInUserDetails, getUserDetails, updateUser, deleteUser, getAllUsers, logoutUser, updatePassword } = require('../controllers/userController');
const { isAuthenticatedUser ,  verifyUser, verifyAdmin} = require('../middleware/auth');

const router = express.Router();



router.route('/register').post(resgisterUser)

router.route('/login').post(loginUser)

router.route('/me').get(isAuthenticatedUser, getLoggedInUserDetails)

router.route('/users').get(verifyAdmin, getAllUsers)

router.route('/user/:id').get(verifyUser,getUserDetails)
.put(verifyUser,updateUser).delete(verifyUser ,deleteUser)

router.route('/user/update').put(verifyUser,updateUser)

router.route('/pass/update').put(verifyUser,updatePassword)

router.route('/logout').post(isAuthenticatedUser , logoutUser)



module.exports = router