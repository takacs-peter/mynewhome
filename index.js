const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('config');
const salesman = require('./routes/salesman');
const building = require('./routes/building');
const defaults = require('./routes/defaults');
const house = require('./routes/house');
const auth = require('./routes/auth');
const user = require('./routes/user');
const photo = require('./routes/photo');


const app = express();
app.use(bodyParser.json());

app.use('/api/salesman', salesman);
app.use('/api/building', building);
app.use('/api/defaults', defaults);
app.use('/api/house', house);
app.use('/api/auth', auth);
app.use('/api/user', user);
app.use('/api/photo', photo);

app.use(express.static('public'))
app.use(express.static('uploads'))

// app.use(multer({
//     dest: './uploads/',
//     rename: function (fieldname, filename) {
//         return filename;
//     },
// }));

mongoose.connect(config.DBHost, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB...')
    })
    .catch((err) => console.error('Could not connect to MongoDB'))

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app
