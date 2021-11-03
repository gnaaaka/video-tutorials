const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },
		description: { type: String, required: true },
		imgUrl: { type: String, required: true },
		isPublic: { type: Boolean, default: false },
		users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamp: true }
);

module.exports = mongoose.model("Course", courseSchema);

// module.exports = class Course {
// 	constructor(
// 		title,
// 		description,
// 		imgUrl,
// 		isPublic
// 		// createdAt,
// 		// usersEnrolled
// 	) {
// 		this.id = makeRandomNum(title);
// 		this.title = title;
// 		this.description = description;
// 		this.imgUrl = imgUrl;
// 		this.isPublic = isPublic;
// 		// this.createdAt = createdAt;
// 		// this.usersEnrolled = usersEnrolled;
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
