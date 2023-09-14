const getDb = require("../util/database").getDb; //me interact me database

class Product {
	constructor(title, price, imageUrl, description) {
		this.title = title;
		this.price = price;
		this.imageUrl = imageUrl;
		this.description = description;
	}

	save() {
		const db = getDb();
		return db //return na mundeson me chain promise
			.collection("products")
			.insertOne(this)
			.then((result) => {
				console.log(result);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	static fetchAll() {
		const db = getDb();
		return db
			.collection("products")
			.find()
			.toArray()
			.then((products) => {
				console.log(products);
				return products;
			})
			.catch((err) => {
				console.log(err);
			}); //it returns a cursor
	}

	static findById(id) {
		const db = getDb();
		return db
			.collection("products")
			.find({ _id: id })
			.next()
			.then((product) => {
				console.log(product);
				return product;
			})
			.catch((err) => {});
	}
}

module.exports = Product;
