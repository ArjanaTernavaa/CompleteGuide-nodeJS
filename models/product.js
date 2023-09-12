const fs = require('fs');
const path = require('path');

const dirName = require('../util/path');
const Cart = require('./cart')

const p = path.join(dirName,'data','products.json');

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err,fileContent)=>{
       if(err){
           return cb([]);
       }
       return cb(JSON.parse(fileContent));
   })

}

module.exports = class Product {
    constructor(id, title,imageUrl, description, price){
        this.id = id;
        this.title = title; //creating a property in this class
        this.imageUrl = imageUrl; //creating a property in this class
        this.description = description; //creating a property in this class
        this.price = price; //creating a property in this class
    }

    save() {
        getProductsFromFile((products) => {
            if(this.id) {
                const existingProductIndex = products.findIndex(product => product.id === this.id);
                const updatedProducts  = [...products];
                updatedProducts[existingProductIndex] = this;
            }
            this.id = Math.random().toString();
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if(err) {
                    console.log(err);
                }
            })
        });
    }

    static fetchAll(cb){
        getProductsFromFile(cb);
}

    // static findById(id, cb){ //cb qe ekezekutohet masi qe e gjejme produktin
    //     getProductsFromFile(products => {
    //         const product = products.find(p => p.id === id);
    //         cb(product);
    //     })
    // }


    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }

    static deleteById(id){
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if(!err){
                    Cart.deleteProduct(id, product.price);
                }
            })
        });
    }
}