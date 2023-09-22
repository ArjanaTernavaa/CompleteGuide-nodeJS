const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const authController = require("../controllers/auth");
const User = require("../models/user");

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.post("/logout", authController.postLogout);

router.get("/signup", authController.getSignup);
router.post(
	"/signup",
	[
		check("email")
			.isEmail()
			.withMessage("Please enter a valid email")
			.custom((value, { req }) => {
				return User.findOne({ email: value }).then((userDoc) => {
					return Promise.reject(
						"Email exists already, please pick a different one."
					);
				});
			}),
		body(
			"password",
			"Please enter a password with only numbers and text and atleast 5 characters."
		)
			.isLength({ min: 5 })
			.isAlphanumeric(),
		body("confirmPassword").custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error("Password have to match.");
			}
		}),
	],
	authController.postSignup
);

router.get("/reset", authController.getReset);
router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);
router.post("/new-password", authController.postNewPassword);

module.exports = router;