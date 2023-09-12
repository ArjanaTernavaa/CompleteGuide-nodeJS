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
	Product.findById(id, (product) => {
		if (!product) {
			return res.redirect("/");
		}
		res.render("admin/edit-product", {
			pageTitle: "Edit Product",
			path: "/admin/edit-product",
			editing: editMode,
			product: product,
		});
	});
};

exports.postEditProduct = (req, res, next) => {
    const product = new Product(
        req.body.id,
        req.body.title,
        req.body.imageUrl,
        req.body.description,
        req.body.price
    );
    product.save();
    res.redirect('/admin/products');
};


exports.postAddProduct = (req, res, next) => {
	const product = new Product(
		null,
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

exports.postDeleteProduct = (req, res, next) => {
	const id = req.body.id;
	Product.deleteById(id);
	res.redirect("/admin/products");
}