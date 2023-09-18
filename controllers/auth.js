exports.getLogin = (req, res, next) => {
	res.render("auth/login", {
		path: "/login",
		pageTitle: "Login page",
		isAuthenticated: req.isLoggedIn
	});
};

exports.postLogin = (req, res, next) => {
    //req.isLoggedIn = true; //si te kryhet requesti qekjo mo ska vlere edhe tani per routes tjera ose request tjera nuk bon, totally seperate requets
	res.redirect("/");
};
