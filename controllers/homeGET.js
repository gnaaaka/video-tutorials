const Course = require("../models/Course");

module.exports = function (req, res) {
	let context = {
		loggedIn: res.user ? true : false,
		username: res.user ? res.user.username : null,
		notify: res.notify,
	};

	let search = req.query.filter;

	Course.find({}).then((courses) => {
		if (res.user) {
			let userCourses = courses
				.filter((course) => {
					return course.creator == res.user.id || course.isPublic;
				})
				.map((course) => (course = course.toJSON()))
				.sort((a, b) => b.createdAt - a.createdAt);

			if (search && search.trim()) {
				filteredCourses = userCourses.filter((course) => {
					return course.title
						.toLowerCase()
						.includes(search.trim().toLowerCase());
				});
				if (filteredCourses.length) {
					context.notify = {
						status: "success",
						message: `Search results for "${search.trim()}" - ${
							filteredCourses.length
						} available course(s)`,
					};
				} else {
					context.notify = {
						status: "warning",
						message: `No available courses matching "${search.trim()}"`,
					};
				}
				context.courses = filteredCourses;
				context.search = search.trim();
			} else {
				context.courses = userCourses;
			}

			res.render("userHome", context);
		} else {
			context.courses = courses
				.filter((course) => {
					return course.isPublic;
				})
				.map((course) => (course = course.toJSON()))
				.sort((a, b) => b.users.length - a.users.length)
				.slice(0, 3);
			res.render("guestHome", context);
		}
	});
};

// const fs = require("fs");

// module.exports = function (req, res) {
// 	console.log("Getting video tutorials");
// 	fs.readFile("./config/database.json", "utf8", (err, data) => {
// 		if (err) throw err;

// 		let courses = JSON.parse(data);

// 		console.log(courses);
// 		let context = {
// 			courses,
// 		};
// 		res.render("index", context);
// 	});
// };
