const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
	Product.findAll()
		.then((products) => {
			res.render("shop/product-list", {
				prods: products,
				pageTitle: "Shop",
				path: "/products",
				hasProducts: products.length > 0,
				activeShop: true,
				productCSS: true,
			});
		})
		.catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
	const id = req.params.id;
	Product.findByPk(id)
		.then((product) => {
			res.render("shop/product-detail", {
				product: product, //view pret nje object
				pageTitle: "Product Detail",
				path: "/products",
				activeShop: true,
				productCSS: true,
			});
		})
		.catch((err) => console.log(err));
};

//alternative
// exports.getProduct = (req, res, next) => {
// 	const id = req.params.id;
// 	Product.findAll({ where : { id : id}})
// 		.then((products) => {
// 			res.render("shop/product-detail", {
// 				product: products[0], //view pret nje object
// 				pageTitle: "Product Detail",
// 				path: "/products",
// 				activeShop: true,
// 				productCSS: true,
// 			});
// 		})
// 		.catch((err) => console.log(err));
// };

exports.getIndex = (req, res, next) => {
	Product.findAll()
		.then((products) => {
			res.render("shop/index", {
				prods: products,
				pageTitle: "Shop",
				path: "/",
			});
		})
		.catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
	Cart.getCart((cart) => {
		Product.fetchAll((products) => {
			const cartProducts = [];
			for (product of products) {
				const cartProductData = cart.products.find(
					(prod) => prod.id === product.id
				);
				if (cartProductData) {
					cartProducts.push({
						productData: product,
						qty: cartProductData.qty,
					});
				}
			}
			res.render("shop/cart", {
				path: "/cart",
				pageTitle: "Your cart",
				products: cartProducts,
			});
		});
	});
};

exports.postCart = (req, res, next) => {
	const id = req.body.id;
	Product.findById(id, (product) => {
		Cart.addProduct(id, product.price);
	});
	res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
	const id = req.body.id;
	Product.findById(id, (product) => {
		if (!product) {
			console.log(`Product with ID ${id} not found.`);
		} else {
			// Product found, proceed with deleting it
			Cart.deleteProduct(id, product.price);
			res.redirect("/cart");
		}
	});
};

exports.getOrders = (req, res, next) => {
	res.render("shop/orders", { path: "/orders", pageTitle: "Your orders" });
};

exports.getCheckout = (req, res, next) => {
	res.render("shop/checkout", { path: "/checkout", pageTitle: "Checkout" });
};
