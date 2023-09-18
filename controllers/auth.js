const User = require('../models/user');

exports.getLogin = (req, res, next) => {
	// const isLoggedIn = req.get("Cookie").split(";")[1].trim().split("=")[1];
	console.log(req.session.isLoggedIn);
	res.render("auth/login", {
		path: "/login",
		pageTitle: "Login page",
		isAuthenticated: false,
	});
};

// exports.postLogin = (req, res, next) => {
// 	//req.session.isLoggedIn = true; //si te kryhet requesti qekjo mo ska vlere edhe tani per routes tjera ose request tjera nuk bon, totally seperate requets
// 	//res.setHeader("Set-Cookie", "isLoggedIn=true; Expires=");
// 	req.session.isLoggedIn = true;
// 	res.redirect("/");
// };
// res.setHeader('Set-Cookie', 'loggedIn=true; Max-Age=10; httpOnly');
// res.setHeader('Set-Cookie', 'loggedIn=true; Max-Age:10; Secure');

module.exports.postLogin = (req, res, next) => {
    User
        .findById('6504313ee6d47352f302461a')
        .then(user => {
            req.session.user = user;
            req.session.isLoggedIn = true;
            req.session.save(err => {
                if(err) console.log(err);
                res.redirect('/');
            });
        })
        .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect("/");
	});
};
