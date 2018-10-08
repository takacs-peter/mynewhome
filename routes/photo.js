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

router.post('/', upload.single('file'), async (req, res) => {
    console.log(req.file);

    var path = req.file.path;
    var imageName = req.file.originalname;


    async function savePhoto(body) {
        const photo = new Photo({
            filename: imageName,
            path: path
        })
        return await photo.save();
    }
    try {
        const result = await savePhoto(req.body);
        console.log(imageName)
        fs.rename('uploads/' + imageName, getNewFileName(req.file, result), function (err) {
            if (err) return res.status(500).send('File saving failed')
            return res.send('File successfully saved')
        });
    } catch (error) {
        res.status(500).send(error);
    }
})

function getNewFileName(file, object) {
    const fileArray = file.filename.split('.')
    const extension = fileArray[fileArray.length - 1]
    console.log(extension)
    return 'uploads/' + object._id + '.' + extension
}

module.exports = router;