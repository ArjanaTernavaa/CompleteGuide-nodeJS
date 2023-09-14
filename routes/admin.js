const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/add-product", adminController.getAddProduct); //we dont execute this function, we just pass a reference to it

router.post("/add-product", adminController.postAddProduct);

// router.get("/products",adminController.getProducts);

// router.get('/edit-product/:id', adminController.getEditProduct)

// router.post('/edit-product', adminController.postEditProduct)

// router.post('/delete-product', adminController.postDeleteProduct)

module.exports = router;
