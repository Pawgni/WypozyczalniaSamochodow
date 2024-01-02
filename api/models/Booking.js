const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    car: {type:mongoose.Schema.Types.ObjectId, ref:'Car'},
    user: {type:mongoose.Schema.Types.ObjectId},
    checkIn: {type:Date},
    checkOut: {type:Date},
    name: {type:String},
    phone: {type:String},
    price: Number,
});

const BookingModel=mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;