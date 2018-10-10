const express = require('express');
const router = express.Router();
const schemas = require('../schemas');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const User = schemas.user;

router.post('/', async (req, res) => {
    if (!req.body.username || !req.body.password) res.status(400).send('Username and password is required')
    let user = await User.findOne({ username: req.body.username })
    if (user) return res.status(400).send("User already registered")

    user = new User(_.pick(req.body, ['username', 'password']))
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save()

    const result = _.pick(user, ['_id', 'username', 'password'])
    res.send(result)

})

module.exports = router

