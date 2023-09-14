const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
	Product.fetchAll()
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
	Product.findById(id)
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

exports.getIndex = (req, res, next) => {
	Product.fetchAll()
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
	req.user
		.getCart()
		.then((cart) => {
			return cart.getProducts().then((products) => {
				res.render("shop/cart", {
					path: "/cart",
					pageTitle: "Your cart",
					products: products,
				});
			});
		})
		.catch((err) => console.log(err));
};

module.exports.postCart = (req, res, next) => {
	const productId = req.body.id;
	let fetchedCart;
	let newQuantity = 1;
	req.user
		.getCart()
		.then((cart) => {
			fetchedCart = cart;
			return cart.getProducts({
				where: { id: productId },
			});
		})
		.then((products) => {
			const product = products[0];
			if (product) {
				const oldQuantity = product.cartItem.quantity;
				newQuantity = oldQuantity + 1;
				return product;
			} else {
				return Product.findByPk(productId);
			}
		})
		.then((product) => {
			return fetchedCart.addProduct(product, {
				through: {
					quantity: newQuantity,
				},
			});
		})
		.then(() => {
			res.redirect("/cart");
		})
		.catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
	const id = req.body.id;
	req.user
		.getCart()
		.then((cart) => {
			return cart.getProducts({
				where: {
					id: id,
				},
			});
		})
		.then((products) => {
			const product = products[0];
			return product.cartItem.destroy();
		})
		.then(() => {
			res.redirect("/cart");
		})
		.catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
	let fetchedCart;
	req.user
		.getCart()
		.then((cart) => {
			fetchedCart = cart;
			return cart.getProducts();
		})
		.then((products) => {
			return req.user.createOrder().then((order) => {
				return order.addProducts(
					products.map((product) => {
						product.orderItem = {
							quantity: product.cartItem.quantity, //ja bon attach ni field t re quantity qe vjen prej cartItems se normal qato elementet qe jane n cart duhet me kon edhe te order
						}; //the name si modeli lidhes
						return product;
					})
				); //each product must have a special field per mu recognize prej sequelize
			});
		})
		.then((result) => {
			fetchedCart.setProducts(null);
		})
		.then((result) => res.redirect("/orders"))
		.catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
	req.user
		.getOrders({include: ['products']}) //qetu jena tu bo eager loading, if youre fetching all orders also fetch related products and give me back and give me an array of orders can also includes the products per order
		.then((orders) => {
			res.render("shop/orders", {
				path: "/orders",
				pageTitle: "Your orders",
				orders:orders
			});
		})
		.catch((err) => console.log(err));
};
