const Hotel = require('../models/hotelModel')
const ErrorHander = require('../utils/ErrorHander')
const asyncErrors = require('../middleware/asyncErrors')
const Room = require('../models/roomModel')

//Create Room
exports.createRoom = asyncErrors(async (req, res, next) => {

    const hotelId = req.params.hotelid
    const room = await Room.create(req.body)

    await Hotel.findByIdAndUpdate(hotelId,{
        $push : {rooms : room._id}
    })

    res.status(201).json({
        success: true,
        room
    })

})

//Get All Rooms
exports.allRooms = asyncErrors(async (req, res, next) => {

    const room = await Room.find()

    if (!room) {
        return next(new ErrorHander('Room not found', 404))
      }

    res.status(200).json({
        success: true,
        room
    })

})

//Get Room Details
exports.roomDetails = asyncErrors(async (req, res, next) => {

    const room = await Room.findById(req.params.id)

    if (!room) {
        return next(new ErrorHander('Room not found with this id', 404))
      }

    res.status(200).json({
        success: true,
        room
    })

})

//Delete Room
exports.deleteRoom = asyncErrors(async (req, res, next) => {

    const room = await Room.findById(req.params.id)
    const hotelId = req.params.hotelid

    if (!room) {
        return next(new ErrorHander('Room not found with this id', 404))
      }

    await Room.findByIdAndDelete(req.params.id)

    await Hotel.findByIdAndUpdate(hotelId,{
        $pull : {rooms : req.params.id}
    })

    res.status(200).json({
        success: true,
        message: 'Room has been deleted'
    })

})

//Update Room
exports.updateRoom = asyncErrors(async (req, res, next) => {


    const chkRooms = await Room.findById(req.params.id)
    

    if (!chkRooms) {
        return next(new ErrorHander('Room not found with this id', 404))
      }

    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        room
    })

})

//Update Room Availability
exports.updateRoomAvailabilty = asyncErrors(async (req, res, next) => {
    
    await Room.updateOne(
        {'roomNumbers._id' : req.params.id},
        {
            $push:{
                'roomNumbers.$.unavailableDates' : req.body.dates
            }
        }
    )

    res.status(200).json({
        success: true,
        message : 'Room status has been updated'
       
    })

})