const express = require('express');
const mongoose = require('mongoose');
const schemas = require('./schemas');
const bodyParser = require('body-parser');
const config = require('./config.json');

const app = express();
app.use(bodyParser.json());
mongoose.connect(config.dbconnection, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB...')
    })
    .catch((err) => console.error('Could not connect to MongoDB'))

const Salesman = mongoose.model('Salesman', schemas.salesman);
const Building = mongoose.model('Building', schemas.building);


app.post('/api/salesman', async (req, res) => {
    async function createSalesman(body) {
        const salesman = new Salesman({
            name: body.name,
            phone: body.phone,
            email: body.email,
        })
        const result = await salesman.save();
        return result;
    }
    const result = await createSalesman(req.body);
    res.send(result);
})

app.get('/api/salesman', async (req, res) => {
    async function getSalesmen() { return await Salesman.find() }
    const result = await getSalesmen();
    res.send(result)
})

app.put('/api/salesman/:id', async (req, res) => {
    let salesman = await Salesman.findOneAndUpdate(req.params.id, { $set: req.body });

    if (!salesman) res.status(404).send('The salesman was not found with the given ID');

    //TODO - VALIDATION

    res.send(salesman);
})

app.post('/api/building', async (req, res) => {
    async function createBuilding(body) {
        const building = new Building({
            name: body.name,
            city: body.city,
            sales: body.sales,
            sold: body.sold,
            construction_start: body.construction_start,
            construction_end: body.construction_end,
            description: body.description
        })
        return await building.save();
    }
    const result = await createBuilding(req.body);
    res.send(result);
})

app.get('/api/building', async (req, res) => {
    async function readBuilding() {
        return await Building.find().populate('sales');
    }
    const result = await readBuilding(req.body);
    res.send(result);
})

app.get('/api/building/:id', async (req, res) => {
    async function readBuilding() {
        return await Building.find(req.params.id);
    }
    const result = await readBuilding(req.body);
    res.send(result);
})


const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));