const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
	//nese perodorim metoda get, post ne vend te use atehere renditja nuk ka rendesi sepse e kerkon the exact path
	Product.fetchAll((products) => {
		res.render("shop/product-list", {
			prods: products,
			pageTitle: "All products",
			path: "/products",
			hasProducts: products.length > 0,
			activeShop: true,
			productCSS: true,
		}); //e perdore the defualt templating engine, munesh me pass objekte qe masnej me mujt me i perdore ne template
	});
};

exports.getProduct = (req, res, next) => {
	const id = req.params.id;
	Product.findById(id, (product) => {
		res.render("shop/product-detail", {
			product: product,
			pageTitle: "Product Detail",
			path: "/products",
			activeShop: true,
			productCSS: true,
		}); //e perdore the defualt templating engine, munesh me pass objekte qe masnej me mujt me i perdore ne template
	});
};

exports.getIndex = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render("shop/index", {
			prods: products,
			pageTitle: "Shop",
			path: "/",
		}); //e perdore the defualt templating engine, munesh me pass objekte qe masnej me mujt me i perdore ne template
	});
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
