let bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const saltConfig = require("../config/config").saltRounds;
const User = require("../models/User");

module.exports = {
	get: function (req, res) {
		let context = {
			loggedIn: false,
			notify: res.notify,
		};
		res.render("register", context);
	},
	post: function (req, res) {
		let username = req.body.username;
		let pass = req.body.password;
		let rePass = req.body.repeatPassword;

		let context = { username, pass, notify: {} };

		let errors = validationResult(req);

		User.findOne({ username: username }).then((user) => {
			if (user) {
				context.notify.status = "warning";
				context.notify.message = "Username already exists";
				res.render("register", context);
			} else if (!errors.isEmpty()) {
				res.status(400);
				context.notify.status = "error";
				context.notify.message =
					"Please address the following username/password requirements:";
				context.notify.msgArr = errors.errors;
				res.render("register", context);
			} else if (pass != rePass) {
				res.status(400);
				context.notify.status = "error";
				context.notify.message =
					"Repeat-Password does not match Password";
				res.render("register", context);
			} else {
				bcrypt.genSalt(saltConfig, (err, salt) => {
					bcrypt.hash(pass, salt, (err, hash) => {
						new User({
							username,
							password: hash,
						})
							.save()
							.then((user) => {
								res.status(201);
								console.log("User successfully created");
								console.log(user);
								res.cookie("notify", {
									status: "success",
									message:
										"New user created! Please login below.",
								});
								res.redirect("/login");
							})
							.catch((err) => {
								console.log(err);
							});
					});
				});
			}
		});
	},
};
