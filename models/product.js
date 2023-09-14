const getDb = require("../util/database").getDb; //me interact me database
const mongodb = require("mongodb");

class Product {
	constructor(title, price, imageUrl, description, id, userId) {
		this.title = title;
		this.price = price;
		this.imageUrl =
			"https://upload.wikimedia.org/wikipedia/commons/9/92/Open_book_nae_02.svg";
		this.description = description;
		this._id = id ? new mongodb.ObjectId(id) : null;
		this.userId = new mongodb.ObjectId(userId);
	}

	save() {
		const db = getDb();
		let dbOp;
		if (this._id) {
			// update the existing product
			dbOp = db
				.collection("products")
				.updateOne({ _id: this._id }, { $set: this }); //ne mongo nuk mujna me thon gjeje qet product me id edhe bone replace me this po duhet me perdore sintakse qe e kupton mongo si ne kete rast set
		} else {
			// insert new product
			dbOp = db.collection("products").insertOne(this);
		}
		return dbOp
			.then((result) => {
				return result;
			})
			.catch((err) => console.log(err));
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
			.find({ _id: new mongodb.ObjectId(id) })
			.next()
			.then((product) => {
				console.log(product);
				return product;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	static deleteById(id) {
		const db = getDb();
		return db
			.collection("products")
			.deleteOne({ _id: new mongodb.ObjectId(id) })
			.then((product) => {
				console.log("deleted");
			})
			.catch((err) => {
				console.log(err);
			});
	}
}

module.exports = Product;
