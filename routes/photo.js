const fs = require('fs');
const express = require('express');
const router = express.Router();
const schemas = require('../schemas');
const multer = require('multer');

const Photo = schemas.file;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({
    storage: storage
});

router.post('/', upload.any(), async (req, res) => {

    /*req.files has the information regarding the file you are uploading...
    from the total information, i am just using the path and the imageName to store in the mongo collection(table)
    */
    var path = req.files[0].path;
    var imageName = req.files[0].originalname;

    // const photo = new Photo({
    //     filename: imageName,
    //     path: path
    // })
    // photo.save()
    //     .then((result) => {
    //         res.send('Image uploaded')
    //     }, (err) => {
    //         res.status(500).send(err.message);
    //     });

    async function savePhoto(body) {
        const photo = new Photo({
            filename: imageName,
            path: path
        })
        return await photo.save();
    }
    try {
        const result = await savePhoto(req.body);
        res.send('Image uploaded')
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;