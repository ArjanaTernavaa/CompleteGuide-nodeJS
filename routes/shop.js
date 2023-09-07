const path = require('path');

const express = require('express');

const rootDir = require("../util/path.js")
const adminData = require('./admin.js');

const router = express.Router();

router.get('/',(req,res,next)=>{ //nese perodorim metoda get, post ne vend te use atehere renditja nuk ka rendesi sepse e kerkon the exact path
    const products = adminData.products;
    res.render('shop',{prods:products, docTitle:"Shop", path:"/", hasProducts:products.length > 0, activeShop:true, productCSS:true}); //e perdore the defualt templating engine, munesh me pass objekte qe masnej me mujt me i perdore ne template 
}); 

module.exports = router;
