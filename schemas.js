const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        validate: {
            validator: function (v) {
                return v.match(/\S+@\S+\.\S+/g)
            },
            message: 'This is not a valid e-mail address'
        },
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, 'mynewhome_jwtPrivateKey')
    return token;
}


let schemas = {};
schemas.salesman = mongoose.model('Salesman', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5
    },
    phone: {
        type: String,
        minlength: 7,
        maxlength: 20,
        required: true,
        validate: {
            validator: function (v) {
                return v.match(/[0-9\+\-\(\)\/]/g)
            },
            message: 'This is not a valid phone number'
        }
    },
    photos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
    },
    email: {
        type: String,
        minlength: 5,
        validate: {
            validator: function (v) {
                return v.match(/\S+@\S+\.\S+/g)
            },
            message: 'This is not a valid e-mail address'
        },
        required: true,
    },
})
)

schemas.building = mongoose.model('Building', new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    sales: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Salesman'
    },
    sold: Boolean,
    construction_start: Date,
    construction_end: Date,
    description: String,
    techdata: [String],
    photos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
    }
})
)

schemas.house = mongoose.model('House', new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
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
    photos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
    },
    building: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building',
        default: null
    },
})
)

schemas.defaults = mongoose.model('Defaults', new mongoose.Schema({
    salesman: {
        name: {
            type: String,
        },
        phone: {
            type: String,
            maxlength: 20,
            validate: {
                validator: function (v) {
                    return v.match(/[0-9\+\-\(\)\/]/g)
                },
                message: 'This is not a valid phone number'
            }
        },
        //image: Buffer,
        email: {
            type: String,
            validate: {
                validator: function (v) {
                    return v.match(/\S+@\S+\.\S+/g) || v == ""
                },
                message: 'This is not a valid e-mail address'
            },
        },
    },
    highlighted: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building',
    },
    lowprice: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Building',
    }],
    partnerpage: {
        address: {
            type: String
        },
        about: {
            type: String
        },
        email: {
            type: String
        }
    }
})
)

schemas.file = mongoose.model('File', new mongoose.Schema({
    filename: String,
    path: String,
    extension: String,
    date: Date
})
)



schemas.user = mongoose.model('User', userSchema)

module.exports = schemas;