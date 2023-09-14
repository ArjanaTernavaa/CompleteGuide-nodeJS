const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
	res.render("admin/edit-product", {
		pageTitle: "Add product",
		path: "/admin/add-product",
		editing: false,
	}); //allows us to send a response
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect("/");
	}
	const id = req.params.id;

	req.user
		.getProducts({ where: { id: id } }) //get products na kthen array kshtu qe neve na vyn veq elementi i pare
		.then((products) => {
			const product = products[0];
			if (!product) {
				return res.redirect("/");
			}
			res.render("admin/edit-product", {
				pageTitle: "Edit Product",
				path: "/admin/edit-product",
				editing: editMode,
				product: product,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postEditProduct = (req, res, next) => {
	const productId = req.body.id;
	const productTitle = req.body.title;
	const productPrice = req.body.price;
	const productImageUrl = req.body.imageUrl;
	const productDescription = req.body.description;

	Product.findByPk(productId)
		.then((product) => {
			product.title = productTitle;
			product.price = productPrice;
			product.imageUrl = productImageUrl;
			product.description = productDescription;
			return product.save(); //e merr produktin edhe e bon save
		})
		.then((result) => {
			res.redirect("/admin/products");
		})
		.catch((err) => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
	const productTitle = req.body.title;
	const productPrice = req.body.price;
	const productImageUrl = req.body.imageUrl;
	const productDescription = req.body.description;
	const product = new Product(
		productTitle,
		productPrice,
		productDescription,
		productImageUrl
	);
	product
		.save()
		.then((result) =>
		 res.redirect("/admin/products"))
		.catch((err) => console.log(err)); //immeditally save it to the database
};

exports.getProducts = (req, res, next) => {
	req.user.getProducts()
		.then((products) => {
			res.render("admin/products", {
				prods: products,
				pageTitle: "Admin Products",
				path: "/admin/products",
			}); //e perdore the default templating engine, munesh me pass objekte qe masnej me mujt me i perdore ne template
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postDeleteProduct = (req, res, next) => {
	const id = req.body.id;
	Product.findByPk(id)
		.then((product) => {
			return product.destroy();
		})
		.then(() => {
			res.redirect("/admin/products");
		})
		.catch((err) => {
			console.log(err);
		});
};
