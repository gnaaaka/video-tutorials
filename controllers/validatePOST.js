const { body } = require("express-validator");

module.exports = {
	registerUser: function (req, res) {
		return [
			body(
				"username",
				"Username must be at least 5 characters long"
			).isLength({ min: 5 }),
			body(
				"username",
				"Username may only contain letters and digits"
			).isAlphanumeric(),
			body(
				"password",
				"Password must be at least 5 characters long"
			).isLength({ min: 5 }),
			body(
				"password",
				"Password may only contain letters and digits"
			).isAlphanumeric(),
		];
	},
	course: function (req, res) {
		return [
			body("title", "Title must be at least 4 characters long").isLength({
				min: 4,
			}),
			body(
				"description",
				"Description must be at least 20 characters long"
			).isLength({ min: 20 }),
			body(
				"imgUrl",
				'Image URL must start with "http://" or "https://"'
			).custom((url) => {
				return url.startsWith("http://") || url.startsWith("https://");
			}),
		];
	},
};
