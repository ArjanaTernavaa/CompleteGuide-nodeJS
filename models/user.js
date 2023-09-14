const getDb = require("../util/database").getDb; //me interact me database
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

class User {
	constructor(name, email) {
		this.name = name;
		this.email = email;
	}

	save() {
		const db = getDb();
		return db
			.collection("users")
			.insertOne(this)
			.then((result) => {
				return result;
			})
			.catch((err) => console.log(err));
	}

	static findById(userId) {
		const db = getDb();
		return db
			.collection("users")
			.findOne({ _id: new ObjectId(userId) })
			.then((user) => {
				return user;
			})
			.catch((err) => console.log(err));
	}
}

module.exports = User;
