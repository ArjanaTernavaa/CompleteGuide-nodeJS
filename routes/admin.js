const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/add-product", adminController.getAddProduct); //we dont execute this function, we just pass a reference to it

router.post("/add-product", adminController.postAddProduct);

router.get("/products",adminController.getProducts);

module.exports = router;
