const Course = require("../models/Course");
const User = require("../models/User");

module.exports = function (req, res) {
	let courseID = req.params.id;
	let user = res.user;

	Course.findById(courseID).then((course) => {
		if (user.id == course.creator) {
			console.log("Deleting course...");
			Course.findByIdAndDelete(courseID)
				.then((course) => {
					for (let user of course.users) {
						User.findById(user._id).then((user) => {
							user.courses = user.courses.filter((course) => {
								return course._id != courseID;
							});
							user.save();
						});
					}
					res.cookie("notify", {
						status: "success",
						message: "Course deleted!",
					});
					res.redirect("/");
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			res.cookie("notify", {
				status: "error",
				message: "Cannot delete course created by another user",
			});
			res.redirect(`/details/${courseID}`);
		}
	});
};
