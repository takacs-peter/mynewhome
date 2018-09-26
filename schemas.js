const mongoose = require('mongoose');

let schemas = {};
schemas.salesman = mongoose.model('Salesman', new mongoose.Schema({
    name: String,
    phone: String,
    //image: Buffer,
    email: String,
})
)

schemas.building = mongoose.model('Building', new mongoose.Schema({
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
    techdata: [String],
    //photos
})
)

schemas.house = mongoose.model('House', new mongoose.Schema({
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
)

schemas.defaults = mongoose.model('Defaults', new mongoose.Schema({
    salesman: {
        name: String,
        phone: String,
        //image: Buffer,
        email: String,
    },
    highlighted: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building'
    },
    lowprice: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building'
    }],
    partnerpage: {
        address: String,
        about: String,
        email: String
    }
})
)

module.exports = schemas;