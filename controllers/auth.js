// exports.postLogin = (req, res, next) => {
// 	//req.session.isLoggedIn = true; //si te kryhet requesti qekjo mo ska vlere edhe tani per routes tjera ose request tjera nuk bon, totally seperate requets
// 	//res.setHeader("Set-Cookie", "isLoggedIn=true; Expires=");
// 	req.session.isLoggedIn = true;
// 	res.redirect("/");
// };
// res.setHeader('Set-Cookie', 'loggedIn=true; Max-Age=10; httpOnly');
// res.setHeader('Set-Cookie', 'loggedIn=true; Max-Age:10; Secure');
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
	// const isLoggedIn = req.get("Cookie").split(";")[1].trim().split("=")[1];
	let message = req.flash("error");
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	console.log(req.session.isLoggedIn);
	res.render("auth/login", {
		path: "/login",
		pageTitle: "Login page",
		errorMessage: message,
	});
};

module.exports.postLogin = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	User.findOne({ email: email })
		.then((user) => {
			if (!user) {
				req.flash("error", "Invalid email or password.");
				return res.redirect("/login");
			}
			bcrypt
				.compare(password, user.password) // compare kthen true ose false, edhe nese passwords dont match prape nuk hyn te catch block se nuk eshte error
				.then((doMatch) => {
					if (doMatch) {
						req.session.user = user;
						req.session.isLoggedIn = true;
						return req.session.save((err) => {
							if (err) console.log(err);
							res.redirect("/");
						});
					} else {
						res.redirect("/login");
					}
				})
				.catch((err) => {
					console.log(err);
					res.redirect("/login");
				});
		})
		.catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect("/");
	});
};

exports.getSignup = (req, res, next) => {
	let message = req.flash("error");
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render("auth/signup", {
		pageTitle: "Signup",
		path: "/signup",
		isAuthenticated: false,
		errorMessage: message
	});
};

exports.postSignup = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;

	User.findOne({ email: email })
		.then((userDoc) => {
			if (userDoc) {
				req.flash("error", "Email exists already, please pick a different one.");
				return res.redirect("/signup");
			} else {
				return bcrypt.hash(password, 12).then((hashedPassword) => {
					const user = new User({
						email: email,
						password: hashedPassword,
						cart: { items: [] },
					});
					return user.save();
				});
			}
		})
		.then(() => {
			res.redirect("/login");
		})
		.catch((err) => console.log(err));
};
