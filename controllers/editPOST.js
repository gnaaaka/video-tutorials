const { validationResult } = require("express-validator");
const Course = require("../models/Course");

module.exports = {
	get: function (req, res) {
		let context = {
			loggedIn: true,
			username: res.user.username,
			notify: res.notify,
		};
		let courseID = req.params.id;
		let userID = res.user.id;

		Course.findById(courseID).then((course) => {
			if (userID == course.creator) {
				context = {
					...course.toJSON(),
					...context,
				};
				res.render("edit", context);
			} else {
				res.cookie("notify", {
					status: "error",
					message: "Cannot edit course created by another user",
				});
				res.redirect(`/details/${courseID}`);
			}
		});
	},
	post: function (req, res) {
		let courseID = req.params.id;
		let title = req.body.title.trim();
		let description = req.body.description.trim();
		let imgUrl = req.body.imgUrl.trim();

		let isPublic = Boolean(req.body.isPublic);
		let context = {
			_id: courseID,
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

		Course.findOne({ title: title })
			.then((course) => {
				if (course && course._id != courseID) {
					context.notify.status = "warning";
					context.notify.message = `"${title}" already exists`;
					res.render("edit", context);
				} else if (!errors.isEmpty()) {
					console.log(errors);
					res.status(400);
					context.notify.status = "error";
					context.notify.message = "Invalid fields :";
					context.notify.msgArr = errors.errors;
					res.render("edit", context);
				} else {
					Course.findById(courseID).then((course) => {
						course.title = title;
						course.description = description;
						course.imgUrl = imgUrl;
						course.isPublic = isPublic;
						course
							.save()
							.then((course) => {
								res.status(201);
								res.cookie("notify", {
									status: "success",
									message: "Course updated!",
								});
								res.redirect(`/details/${courseID}`);
							})
							.catch((err) => {
								console.log(err);
							});
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	},
};
