const express = require('express');
const router = express.Router();
const schemas = require('../schemas');
const auth = require('../middleware/auth');

const Salesman = schemas.salesman;

router.post('/', auth, async (req, res) => {
    async function createSalesman(body) {
        const salesman = new Salesman({
            name: body.name,
            phone: body.phone,
            email: body.email,
        })
        try {
            const result = await salesman.save();
            return result;
        } catch (ex) {
            res.status(400).send(ex.message)
        }
    }
    const result = await createSalesman(req.body);
    res.send(result);
})

router.get('/', async (req, res) => {
    async function getSalesmen() { return await Salesman.find().populate('photos') }
    const result = await getSalesmen();
    res.send(result)
})

router.get('/:id', async (req, res) => {
    async function getSalesmen() {
        Salesman.findById(req.params.id, (err, salesman) => {
            if (err) {
                const errorMessage = {
                    _id: req.params.id,
                    message: "Salesman with the given ID not found"
                }
                return res.status(404).send(errorMessage)
            }
            return res.send(salesman)
        })
    }
    getSalesmen();

})

router.put('/:id', auth, async (req, res) => {
    Salesman.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        {
            new: true,
            runValidators: true
        },
        (err, salesman) => {
            if (err) return res.status(400).send(err);
            return res.send(salesman)
        }
    )
})

router.delete('/:id', auth, async (req, res) => {
    Salesman.findByIdAndRemove(req.params.id, (err, salesman) => {
        if (err) return res.status(404).send(err)
        const response = {
            message: "Salesman successfully deleted!",
            id: salesman._id
        }
        return res.status(200).send(response)
    })
})


module.exports = router;