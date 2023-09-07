const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/add-product',productsController.getAddProduct); //we dont execute this function, we just pass a reference to it

router.post('/add-product',productsController.postAddProduct);

module.exports = router;
