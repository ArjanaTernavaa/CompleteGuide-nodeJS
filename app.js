const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errors = require("./controllers/error");

const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
	//this is run for incoming requests
	User.findByPk(1)
		.then((user) => {
			req.user = user; //jena tu e shtu ni field ne request, qe qdo request qe bohet me i bo permes ni useri
			//, nuk jena veq tu dergu dergu json object po edhe the full sequelize object qe perfshin edhe funkisone tjera qe mujna me i use ma vone
			next();
		})
		.catch((error) => {
			console.log(error);
		});
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errors.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

//npm start runs all the code below
sequelize
	.sync()
	.then(() => {
		return User.findByPk(1);
	})
	.then((user) => {
		if (!user) {
			User.create({ name: "Arjana", email: "arjana@gmail.com" });
		}
		return user; //nese osht me ni then block automatically returns a promise
	})
	.then((user) => {
		//console.log(user);
		return user.createCart();
	})
	.then((cart) => {
		app.listen(3002);
	})
	.catch((err) => console.log(err)); //na krijon tabletat dhe relationships ne db
