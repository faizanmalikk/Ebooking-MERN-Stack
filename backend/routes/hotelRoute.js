const express = require('express');
const { createHotel, allHotels, hotelDetails, deleteHotel, updateHotel, countByCity, countByType, getHotelRooms } = require('../controllers/hotelController');
const { verifyAdmin } = require('../middleware/auth');
const router = express.Router();


router.route('/hotel/create').post(verifyAdmin, createHotel)

router.route('/hotels').get(allHotels)

router.route('/hotel/find/:id').get(hotelDetails)
.delete(verifyAdmin, deleteHotel).
put(verifyAdmin, updateHotel)

router.route('/hotel/countByCity').get(countByCity)

router.route('/hotel/countByType').get(countByType)

router.route('/hotel/room/:id').get(getHotelRooms)



module.exports = router