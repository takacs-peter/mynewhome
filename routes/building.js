const express = require('express');
const router = express.Router();
const schemas = require('../schemas');

const Building = schemas.building;


router.post('/', async (req, res) => {
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

router.get('/', async (req, res) => {
    async function readBuilding() {
        return await Building.find().populate('sales');
    }
    const result = await readBuilding(req.body);
    res.send(result);
})

router.get('/:id', async (req, res) => {
    async function readBuilding() {
        return await Building.find(req.params.id);
    }
    const result = await readBuilding(req.body);
    res.send(result);
})

router.delete('/:id', async (req, res) => {
    Building.findByIdAndRemove(req.params.id)
        .then((result) => res.send(result))
        .catch((err) => {
            res.status(500).send(err)
        })
})

module.exports = router 