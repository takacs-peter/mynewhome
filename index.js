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
const House = mongoose.model('House', schemas.house);
const Defaults = mongoose.model('Defaults', schemas.defaults);

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
    Salesman.findOneAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((result) => res.send(result))
        .catch((err) => console.error(err))

    //TODO - VALIDATION

})

app.delete('/api/salesman/:id', async (req, res) => {
    Salesman.findByIdAndRemove(req.params.id, (err, salesman) => {
        if (err) return res.status(500).send(err)
        const response = {
            message: "Salesman successfully deleted",
            id: salesman._id
        }
        return res.status(200).send(response)
    })
        .then((result) => res.send(body.params.id))
        .catch((err) => res.status(500).send(err))
})

app.post('/api/building', async (req, res) => {
    async function createBuilding(body) {
        const building = new Building({
            ...body
        })
        return await building.save();
    }
    try {
        const result = await createBuilding(req.body);
        res.send(result)
    } catch (error) {
        res.send(error);
    }
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

app.delete('/api/building/:id', async (req, res) => {
    Building.findByIdAndRemove(req.params.id)
        .then((result) => res.send(result))
        .catch((err) => {
            res.status(500).send(err)
            console.log(err)
        })
})

app.put('/api/defaults', async (req, res) => {
    try {
        const updatedDefaults = await Defaults.findByIdAndUpdate(
            '5ba3aadf6bab640e959d7dae',
            { $set: { ...req.body } },
            { new: true }
        )
        console.log(updatedDefaults)
        res.send(updatedDefaults)
    } catch (error) {
        res.status(500).send(error)
    }

})


app.get('/api/defaults', async (req, res) => {
    const defaults = await Defaults.find()
    res.send(defaults)
})

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));