const express = require('express');
const mongoose = require('mongoose');
const http = require('http');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
})


app.get('api/courses', (req, res) => {


})
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));