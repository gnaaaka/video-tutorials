const Course = require("../models/Course");
const User = require("../models/User");

module.exports = function (req, res) {
	let courseID = req.params.id;
	let userID = res.user.id;
	console.log(userID);

	Course.findById(courseID)
		.then((course) => {
			if (course.creator == userID) {
				res.status(403);
				res.cookie("notify", {
					status: "warning",
					message: "Users cannot enroll in their own courses",
				});
				res.redirect(`/details/${courseID}`);
			} else if (course.users.includes(userID)) {
				res.status(405);
				res.cookie("notify", {
					status: "warning",
					message: "You're already enrolled in this course",
				});
				res.redirect(`/details/${courseID}`);
			} else {
				course.users.push(userID);
				course.save();
				User.findById(userID).then((user) => {
					user.courses.push(courseID);
					user.save();
				});
				res.status(200);
				res.cookie("notify", {
					status: "success",
					message: "Enrolled in course!",
				});
				res.redirect("/");
			}
		})
		.catch((err) => {
			console.log(err);
		});
};
