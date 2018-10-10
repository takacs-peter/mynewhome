const fs = require('fs');
const express = require('express');
const router = express.Router();
const schemas = require('../schemas');
const multer = require('multer');
const path = require('path')
const Photo = schemas.file;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});

router.post('/', upload.single('file'), async (req, res) => {
    const path = req.file.path;
    const imageName = req.file.originalname;

    async function savePhoto() {
        const photo = new Photo({
            filename: imageName,
            path: path,
            extension: getExtension(req.file),
            uploaded: Date.now()
        })
        return await photo.save();
    }
    try {
        const result = await savePhoto(req.body);
        fs.rename('uploads/' + imageName, getNewFileName(req.file, result), function (err) {
            if (err) return res.status(500).send('File saving failed')
            return res.send('File successfully saved')
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const result = await Photo.findById(id)
    const fileName = result.path;
    const fileToSend = path.join(__dirname, "../uploads/", id.toString() + '.' + getExtension(result))
    res.sendFile(fileToSend)
})


function getNewFileName(file, object) {
    const fileArray = file.filename.split('.')
    const extension = fileArray[fileArray.length - 1]
    return 'uploads/' + object._id.toString() + '.' + extension
}

function getExtension(file) {
    const fileArray = file.filename.split('.')
    const extension = fileArray[fileArray.length - 1]
    return extension
}

module.exports = router;