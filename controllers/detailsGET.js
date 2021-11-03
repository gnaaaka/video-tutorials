const Course = require("../models/Course");

module.exports = function (req, res) {
	let context = {
		loggedIn: true,
		username: res.user.username,
		notify: res.notify,
	};

	let user = res.user;
	let courseID = req.params.id;

	Course.findById(courseID)
		.then((course) => {
			if (user.id == course.creator) {
				context.isCreator = true;
			}
			if (course.users.includes(user.id)) {
				context.enrolled = true;
			}
			context = { ...course.toJSON(), ...context };
			res.render("details", context);
		})
		.catch((err) => {
			console.log(err);
		});
};

// const fs = require("fs");

// console.log(req.params);
// let id;

// if (Number(req.params.id)) {
// id = req.params.id;
// console.log(id);

// Course.findById(id).populate(courses) =>
// console.log(courses );

// 		fs.readFile("./config/database.json", "utf8", (err, data) => {
// 			if (err) throw err;

// 			let courses = JSON.parse(data);
// 			let course = courses.find((course) => course.id == id);

// 			let context = {
// 				...course,
// 			};
// 			res.render("details", context);
// 		});
// 	}
// };
