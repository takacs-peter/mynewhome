const mongoose = require('mongoose');

let schemas = {};
schemas.salesman = new mongoose.Schema({
    name: String,
    phone: String,
    //image: Buffer,
    email: String,
})

schemas.building = new mongoose.Schema({
    name: String,
    city: String,
    sales: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Salesman'
    },
    sold: Boolean,
    construction_start: Date,
    construction_end: Date,
    description: String,
    //techdata
    //photos
})

schemas.house = new mongoose.Schema({
    name: String,
    price: Number,
    number: String,
    description: String,
    type: String,
    area: Number,
    floor: String,
    balcony_size: Number,
    rooms: String,
    real_size: Number,
    completion: Date,
    heating: String,
    //photos: Buffer,
    building: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building'
    }],
})

module.exports = schemas;