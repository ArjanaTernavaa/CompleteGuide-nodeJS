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
    constructor(title){
        this.title = title; //creating a property in this class
    }

    save(){
        //products.push(this);
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err,fileContent)=>{console.log(err);});
        });
    }

    static fetchAll(cb){
        getProductsFromFile(cb);
}
}