const Hotel = require('../models/hotelModel')
const ErrorHander = require('../utils/ErrorHander')
const asyncErrors = require('../middleware/asyncErrors')
const Room = require('../models/roomModel')
const cloudinary = require('cloudinary')


//Create Hotel
exports.createHotel = asyncErrors(async (req, res, next) => {


    let images = []

    if (typeof req.body.images === 'string') {
      images.push(req.body.images)
    } else {
      images = req.body.images
    } 
  
    let imageLinks = []
  
    for (let index = 0; index < images.length; index++) {
      const result = await cloudinary.v2.uploader.upload(images[index], {
        folder: 'Ecommerce',
  
      })
  
      imageLinks.push({
        public_id: result.public_id,
        url: result.secure_url
      })
    }
  
    req.body.images = imageLinks
  
   
  
    const hotel = await Hotel.create(req.body)
    res.status(201).json({
      success: true,
      hotel
    })

})

//Get All Hotels
exports.allHotels = asyncErrors(async (req, res, next) => {

    const { min, max, ...others } = req.query;

      const hotel = await Hotel.find({
        ...others,
        cheapestPrice: { $gte: min | 1, $lte: max || 999999 },
      })
    if (!hotel) {
        return next(new ErrorHander('Hotel not found', 404))
    }

    res.status(200).json({
        success: true,
        hotel
    })

})

//Get Hotel Details
exports.hotelDetails = asyncErrors(async (req, res, next) => {

    const hotel = await Hotel.findById(req.params.id)

    if (!hotel) {
        return next(new ErrorHander('Hotel not found with this id', 404))
    }

    res.status(200).json({
        success: true,
        hotel
    })

})

//Delete Hotel
exports.deleteHotel = asyncErrors(async (req, res, next) => {

    const hotel = await Hotel.findById(req.params.id)

    if (!hotel) {
        return next(new ErrorHander('Hotel not found with this id', 404))
    }

    for (let index = 0; index < hotel.images.length; index++) {

        await cloudinary.v2.uploader.destroy(hotel.images[index].public_id)
    
      } 

    await hotel.remove()

    res.status(200).json({
        success: true,
        message: 'Hotel has been deleted'
    })

})

//Update Hotel
exports.updateHotel = asyncErrors(async (req, res, next) => {


    const hotels = await Hotel.findById(req.params.id)

    if (!hotels) {
        return next(new ErrorHander('Hotel not found with this id', 404))
    }

    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        hotel
    })

})

//Count by City
exports.countByCity = asyncErrors(async (req, res, next) => {


    const cities = req.query.cities.split(",");

    const list = await Promise.all(
        cities.map((city) => {
            return Hotel.countDocuments({ city: city });
        })
    )

    res.status(200).json({
        success: true,
        list
    })

})

//Count by Type
exports.countByType = asyncErrors(async (req, res, next) => {

    const hotelCount = await Hotel.countDocuments({ type: 'hotel' })
    const apartmentCount = await Hotel.countDocuments({ type: 'apartment' })
    const villasCount = await Hotel.countDocuments({ type: 'villas' })
    const cabinCount = await Hotel.countDocuments({ type: 'cabin' })
    const resortsCount = await Hotel.countDocuments({ type: 'resort' })


    res.status(200).json([
        {
            type: 'hotel',
            count: hotelCount
        },
        {
            type: 'apartment',
            count: apartmentCount
        },
        {
            type: 'villas',
            count: villasCount
        },
        {
            type: 'cabin',
            count: cabinCount
        },
        {
            type: 'resort',
            count: resortsCount
        }

    ])

})

//Get Hotel Rooms
exports.getHotelRooms = asyncErrors(async (req, res, next) => {
    
    const hotel = await Hotel.findById(req.params.id)

    const list = await Promise.all(
        hotel.rooms.map((room) => {
            return  Room.findById(room)
        })
    )

    res.status(200).json({
        success: true,
        list
    })

})

