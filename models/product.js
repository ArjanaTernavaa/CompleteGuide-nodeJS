const db = require("../util/database");

const Cart = require("./cart");

module.exports = class Product {
	constructor(id, title, imageUrl, description, price) {
		this.id = id;
		this.title = title; //creating a property in this class
		this.imageUrl = imageUrl; //creating a property in this class
		this.description = description; //creating a property in this class
		this.price = price; //creating a property in this class
	}

	save() {
		return db.execute(
			`INSERT INTO products (title, price, description, imageUrl) values (?,?,?,?)`,
			[this.title, this.price, this.description, this.imageUrl]
		);
	}

	static fetchAll() {
		return db.execute("SELECT * FROM products");
	}

	static deleteById(id) {
        
    }

	static findById(id) {
       return db.execute(`select * from products where products.id = ?`,id);
    }
};
