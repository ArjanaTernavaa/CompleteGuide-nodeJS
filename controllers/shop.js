const Product = require('../models/product');

exports.getProducts = (req,res,next)=>{ //nese perodorim metoda get, post ne vend te use atehere renditja nuk ka rendesi sepse e kerkon the exact path
    Product.fetchAll((products)=>{
        res.render('shop/product-list',{prods:products, pageTitle:"All products", path:"/products",
         hasProducts:products.length > 0, activeShop:true, productCSS:true}); //e perdore the defualt templating engine, munesh me pass objekte qe masnej me mujt me i perdore ne template 
    });
}

exports.getIndex = (req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('shop/index',{prods:products, pageTitle:"Shop", path:"/"}); //e perdore the defualt templating engine, munesh me pass objekte qe masnej me mujt me i perdore ne template 
    });  
}

exports.getCart = (req,res,next)=>{
    res.render('shop/cart', {path:'/cart', pageTitle:"Your cart"})
}

exports.getOrders = (req,res,next)=>{
    res.render('shop/orders', {path:'/orders', pageTitle:"Your orders"})
}


exports.getCheckout = (req,res,next)=>{
    res.render('shop/checkout', {path:'/checkout', pageTitle:"Checkout"})
}

