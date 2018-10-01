const express = require('express');
const mongoose = require('mongoose');
const schemas = require('./schemas');
const bodyParser = require('body-parser');
const config = require('config');
const salesman = require('./routes/salesman');
const building = require('./routes/building');
const defaults = require('./routes/defaults');

const app = express();
app.use(bodyParser.json());

app.use('/api/salesman', salesman);
app.use('/api/building', building);
app.use('/api/defaults', defaults);

mongoose.connect(config.DBHost, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB...')
    })
    .catch((err) => console.error('Could not connect to MongoDB'))

const House = schemas.house;


const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app
