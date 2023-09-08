const fs = require('fs');
const path = require('path');

const dirName = require('../util/path');

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
    constructor(title,imageUrl, description, price){
        this.title = title; //creating a property in this class
        this.imageUrl = imageUrl; //creating a property in this class
        this.description = description; //creating a property in this class
        this.price = price; //creating a property in this class
    }

    save() {
        this.id = Math.random().toString();
        getProductsFromFile((products) => {
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

    static findById(id, cb){ //cb qe ekezekutohet masi qe e gjejme produktin
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        })
    }
}