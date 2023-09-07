const Product = require('../models/product');

exports.getAddProduct = (req,res,next)=>{
    res.render('add-product',
    { docTitle:"Add product", path:'/admin/add-product',
     formsCSS:true, productCSS:true, activeAddProduct:true}); //allows us to send a response
}


exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/') 
}


exports.getProducts = (req,res,next)=>{ //nese perodorim metoda get, post ne vend te use atehere renditja nuk ka rendesi sepse e kerkon the exact path
    Product.fetchAll((products)=>{
        res.render('shop',{prods:products, docTitle:"Shop", path:"/",
         hasProducts:products.length > 0, activeShop:true, productCSS:true}); //e perdore the defualt templating engine, munesh me pass objekte qe masnej me mujt me i perdore ne template 
    });
}