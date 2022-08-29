const express = require('express');
const { createRoom, allRooms, roomDetails, deleteRoom, updateRoom, updateRoomAvailabilty } = require('../controllers/roomController');
const { verifyAdmin , isAuthenticatedUser } = require('../middleware/auth');
const router = express.Router();


router.route('/room/create/:hotelid').post(verifyAdmin, createRoom)

router.route('/rooms').get(allRooms)

router.route('/room/:id').get(roomDetails).put(verifyAdmin, updateRoom)

router.route('/room/:id/:hotelid').delete(verifyAdmin, deleteRoom)

router.route('/room/status/:id').put(isAuthenticatedUser , updateRoomAvailabilty)


module.exports = router