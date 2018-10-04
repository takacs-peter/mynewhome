const express = require('express');
const router = express.Router();
const schemas = require('../schemas');
const auth = require('../middleware/auth');

const Building = schemas.building;


router.post('/', auth, async (req, res) => {
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
        res.status(400).send(error);
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

router.put('/:id', auth, (req, res) => {
    Building.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        {
            new: true,
            runValidators: true
        },
        (err, building) => {
            if (err) return res.status(400).send(err);
            return res.send(building)
        }
    )
})

router.delete('/:id', auth, async (req, res) => {
    Building.findByIdAndRemove(req.params.id)
        .then((result) => {
            const response = {
                id: req.params.id,
                message: 'Building successfully deleted!'
            }
            res.send(response)
        })
        .catch((err) => {
            res.status(404).send(err)
        })
})

module.exports = router 