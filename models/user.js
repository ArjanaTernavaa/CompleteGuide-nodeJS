const Sequelize = require("sequelize"); //capital s se eshte klase
const sequelize = require("../util/database");

const User = sequelize.define("user", {
	id: {
		type: Sequelize.INTEGER.UNSIGNED,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	name: Sequelize.STRING,
	email: Sequelize.STRING
});
 
module.exports = User;