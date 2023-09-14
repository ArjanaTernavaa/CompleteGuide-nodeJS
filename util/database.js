const mongodb = require("mongodb");
require("dotenv").config();

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
	MongoClient.connect(process.env.DB_URL)
		.then((client) => {
			console.log("connected!");
			_db = client.db("shop");
			callback();
		})
		.catch((error) => {
			console.log(error);
			throw error;
		});
};

const getDb = () => {
	if (_db) {
		return _db;
	}
	throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
