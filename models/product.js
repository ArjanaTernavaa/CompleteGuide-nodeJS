const fs = require('fs');
const path = require('path');


const products = [];

module.exports = class Product {
    constructor(title){
        this.title = title; //creating a property in this class
    }

    save(){
        //products.push(this);
    }

    static fetchAll(){
        return products;
    }
}