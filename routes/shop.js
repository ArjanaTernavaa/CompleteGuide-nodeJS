const path = require('path');

const express = require('express');

const rootDir = require("../util/path.js")
const adminData = require('./admin.js');

const router = express.Router();

router.get('/',(req,res,next)=>{ //nese perodorim metoda get, post ne vend te use atehere renditja nuk ka rendesi sepse e kerkon the exact path
    console.log(adminData.products);
    res.sendFile(path.join(rootDir,'views/shop.html')) //allows us to send a response as a file
}); 

module.exports = router;
