const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
	res.render("admin/add-product", {
		pageTitle: "Add product",
		path: "/admin/add-product",
		formsCSS: true,
		productCSS: true,
		activeAddProduct: true,
	}); //allows us to send a response
};

exports.postAddProduct = (req, res, next) => {
	// const title =req.body.title;
	// const imageUrl = req.body.imageUrl;
	// const description = req.body.description;
	// const price = req.body.price;
	// console.log(req.body);
	// const product = new Product(title,imageUrl, description, price);
	// product.save();
	// console.log(req.body);
	const product = new Product(
        req.body.title,
        req.body.imageUrl,
        req.body.description,
        req.body.price
    );
    product.save();
	res.redirect("/");
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render("admin/products", {
			prods: products,
			pageTitle: "Admin Products",
			path: "/admin/products",
		}); //e perdore the defualt templating engine, munesh me pass objekte qe masnej me mujt me i perdore ne template
	});
};
