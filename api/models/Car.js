const mongoose = require('mongoose');
 
const carSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxSeats: Number,
    price: Number,
});
 
const CarModel = mongoose.model('Car', carSchema);
 
module.exports = CarModel;