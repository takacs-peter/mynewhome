const express = require('express');
const router = express.Router();
const schemas = require('../schemas');

const Salesman = schemas.salesman;

router.post('/', async (req, res) => {
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
    async function getSalesmen() { return await Salesman.find() }
    const result = await getSalesmen();
    res.send(result)
})

router.get('/:id', async (req, res) => {
    async function getSalesmen() {
        Salesman.findById(req.params.id, (err, salesman) => {
            if (err) res.status(404).send()
            res.send(salesman)
        })
    }
    await getSalesmen();

})

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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