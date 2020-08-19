const path = require("path");
const multer = require("multer");
const express = require('express')
var fs = require('fs')

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req, file, cb){
        cb(null,file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
})

const router = express.Router();
router.post("/", upload.single('myImage'), (req,res) => {
    console.log(req.file)
    fs.rename(path.join(__dirname, '../../', 'uploads', req.file.filename),
        path.join(__dirname, '../../', 'frontend', 'public', 'uploads', req.file.filename), function (err) {
            if (err) throw err
            console.log('Successfully renamed - AKA moved!')
        })
    res.send(`/uploads/${req.file.filename}`)
})


module.exports = router
