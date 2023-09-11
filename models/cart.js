const fs = require('fs');
const path = require('path');

const dirName = require('../util/path');

const p = path.join(dirName,'data','cart.json');



const getCartFromFile = callback => {
    fs.readFile(p, (err, fileContent) => {
        if(err) {
            callback({products: [], totalPrice: 0});
        } else {
            callback(JSON.parse(fileContent));
        }
    });
};


module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        getCartFromFile(cart => {
            let existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            let existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {
                    id: id,
                    qty: 1
                };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                if(err) {
                    console.log(err);
                }
            });
        });
    }

    static deleteProduct(id, productPrice){
        fs.readFile(p, (err, fileContent) => {
            if(err) {
                return;
            }
                const updatedCart = {...JSON.parse(fileContent)};
                const product = updatedCart.products.find(prod => prod.id === id);
                // const productQty = product.qty;
                updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
                updatedCart.totalPrice = updatedCart.totalPrice - productPrice * product.qty;
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
            console.log(err);
        })
            }
        );  
    }
}