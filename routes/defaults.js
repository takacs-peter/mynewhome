const express = require('express');
const router = express.Router();
const schemas = require('../schemas');
const auth = require('../middleware/auth');

const Defaults = schemas.defaults;

router.put('/', auth, async (req, res) => {
    async function createDefaults(body) {
        let defaults = await Defaults.findOne().populate('highlighted').populate('lowprice')
        if (defaults == null) {
            const toStore = new Defaults({
                salesman: {
                    name: "",
                    email: "",
                    phone: ""
                },
                highlighted: null,
                lowprice: null,
                partnerpage: {
                    address: "",
                    about: "",
                    email: "",
                }
            })
            defaults = await toStore.save()
        }


        Defaults.findByIdAndUpdate(
            defaults._id,
            req.body,
            {
                new: true,
                runValidators: true,
                upsert: false
            },
            (err, result) => {
                if (err) {
                    res.status(400).send(err.message)
                } else {
                    res.send(result)
                }
            });
    }
    createDefaults(req.body)
})



router.get('/', async (req, res) => {
    const defaults = await Defaults.findOne().populate('highlighted').populate('lowprice')
    res.send(defaults)
})

module.exports = router