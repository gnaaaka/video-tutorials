const { validationResult } = require("express-validator");
const Course = require("../models/Course");

module.exports = {
	get: function (req, res) {
		let context = {
			loggedIn: true,
			username: res.user.username,
			notify: res.notify,
		};

		res.render("create", context);
	},
	post: function (req, res) {
		let title = req.body.title.trim();
		let description = req.body.description.trim();
		let imgUrl = req.body.imgUrl.trim();
		let isPublic = Boolean(req.body.isPublic);
		let context = {
			title,
			description,
			imgUrl,
			isPublic,
			username: res.user.username,
			loggedIn: true,
			notify: {},
		};

		let errors = validationResult(req);
		console.log(errors);

		Course.findOne({ title: title }).then((course) => {
			if (course) {
				context.notify.status = "warning";
				context.notify.message = `"${title}" already exists`;
				res.render("create", context);
			} else if (!errors.isEmpty()) {
				console.log(errors);
				res.status(400);
				context.notify.status = "error";
				context.notify.message = "Invalid fields:";
				context.notify.msgArr = errors.errors;
				res.render("create", context);
			} else {
				new Course({
					title,
					description,
					imgUrl,
					isPublic,
					creator: res.user.id,
				})
					.save()
					.then((course) => {
						res.status(201);
						res.cookie("notify", {
							status: "success",
							message: "Course created!",
						});
						res.redirect("/");
					})
					.catch((err) => {
						console.log(err);
					});
			}
		});
	},
};

// const url = require("url");
// const path = require("path");
// const fs = require("fs");

// const qs = require("querystring");
// const formidable = require("formidable");

// module.exports = function (req, res) {
// 	console.log("Creating a COURSE!");
// 	console.log(Course);

// 	console.log(req.body);
// 	// let form = new formidable.IncomingForm();

// 	let fields = req.body;
// 	new Course({
// 		title: fields.title,
// 		description: fields.description,
// 		imgUrl: fields.imgUrl,
// 		isPublic: fields.isPublic,
// 		createdAt: fields.CreatedAt,
// 		usersEnrolled: fields.usersEnrolled,
// 	})

// 		.save()
// 		.then((courses) => {
// 			console.log(courses);
// 			res.redirect("/");
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// };
// form.parse(req, (err, fields, files) => {
// 	if (err) {
// 		console.log(err);
// 		return;
// 	}

// let newCourse = new Course(
// 	fields.title,
// 	fields.description,
// 	fields.imgUrl,
// 	fields.isPublic,
// 	fields.createdAt,
// 	fields.usersEnrolled
// );

// fs.readFile("./config/database.json", "utf8", (err, data) => {
// 	if (err) throw err;
// 	// console.log("Uploading Course data");
// 	let courses = JSON.parse(data);
// 	courses.push(newCourse);

// 	let json = JSON.stringify(courses);
// 	console.log(json);

// 	fs.writeFile("./config/database.json", json, (err) => {
// 		if (err) throw err;
// 		console.log("Data uploaded successfully");

// 		res.redirect("/");
// 	});
// });
// )};
