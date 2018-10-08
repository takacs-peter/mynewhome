const express = require('express');
const router = express.Router();
const schemas = require('../schemas');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const User = schemas.user;

router.post('/', async (req, res) => {
    if (!req.body.username || !req.body.password) res.status(402).send('Username and password is required')
    let user = await User.findOne({ username: req.body.username })
    if (!user) res.status(401).send('Invalid username or password')

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) res.status(401).send('Invalid username or password')
    else {
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'username']));
    }

})

module.exports = router
