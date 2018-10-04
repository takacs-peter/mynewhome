const express = require('express');
const router = express.Router();
const schemas = require('../schemas');
const auth = require('../middleware/auth');

const House = schemas.house;

router.get('/', async (req, res) => {
    const result = await House.find();
    res.send(result);
})


router.post('/', auth, async (req, res) => {
    async function createHouse(body) {
        const building = new House({
            ...body
        })
        return await building.save();
    }
    try {
        const result = await createHouse(req.body);
        res.send(result)
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.put('/:id', auth, async (req, res) => {
    House.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        {
            new: true,
            runValidators: true
        },
        (err, house) => {
            if (err) return res.status(400).send(err);
            return res.send(house)
        }
    )
})

router.delete('/:id', auth, async (req, res) => {
    House.findByIdAndRemove(req.params.id)
        .then((result) => {
            const response = {
                _id: req.params.id,
                message: 'House successfully deleted!'
            }
            res.send(response)
        })
        .catch((err) => {
            res.status(404).send(err)
        })
})

module.exports = router