const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:id", shopController.getProduct);

// router.get("/cart", shopController.getCart);

// router.post("/cart", shopController.postCart);

// router.get("/orders", shopController.getOrders);

// router.post("/create-order", shopController.postOrder); //qekjo route duhet me kon e njejte me ata qe e jepim te action n html

// router.post("/cart-delete-item", shopController.postCartDeleteProduct);

module.exports = router;
 