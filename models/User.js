const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

module.exports = mongoose.model("User", userSchema);

// module.exports = class User {
// 	constructor(username, password, enrolledCourses) {
// 		this.id = makeRandomNum(username);
// 		this.username = username;
// 		this.password = password;
// 		this.enrolledCourses = enrolledCourses;
// 	}
// };

// function makeRandomNum(string) {
// 	let sum = 0;
// 	for (let char of string) {
// 		sum += char.charCodeAt();
// 	}
// 	sum += parseInt(Math.random() * string.length);
// 	return sum;
// }
