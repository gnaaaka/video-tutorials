let jwt = require("jsonwebtoken");

const jwtConfig = require("../config/config").jwt;

const homeGET = require("../controllers/homeGET");

const createPOST = require("../controllers/createPOST");

const detailsGET = require("../controllers/detailsGET");

const editPOST = require("../controllers/editPOST");

const loginPOST = require("../controllers/loginPOST");

const registerPOST = require("../controllers/registerPOST");

const enrollPOST = require("../controllers/enrollPOST");

const deletePOST = require("../controllers/deletePOST");

const validatePOST = require("../controllers/validatePOST");

module.exports = (app) => {
	app.use((req, res, next) => {
		res.notify = req.cookies.notify;
		res.clearCookie("notify");

		if (req.cookies.user) {
			try {
				let decodedJWT = jwt.verify(req.cookies.user, jwtConfig.secret);
				res.user = {
					id: decodedJWT.id,
					username: decodedJWT.username,
				};
				next();
			} catch (err) {
				res.status(401);
				res.clearCookie("user");
				res.cookie("notify", {
					status: "warning",
					message: "Session expired",
				});

				res.redirect("/");
			}
		} else {
			next();
		}
	});

	app.use(
		[
			"/create/course",
			"/delete/course/:id",
			"/details/:id",
			"/edit/course/:id",
			"/enroll/:id",
			"/logout",
		],
		(req, res, next) => {
			if (!res.user) {
				res.cookie("notify", {
					status: "warning",
					message: "Not logged in",
				});
				res.redirect("/");
			} else {
				next();
			}
		}
	);

	app.get("/", homeGET);

	app.get("/details/:id", detailsGET);

	app.get("/register", registerPOST.get);
	app.post("/register", validatePOST.registerUser(), registerPOST.post);

	app.get("/login", loginPOST.get);
	app.post("/login", loginPOST.post);

	app.get("/logout", (req, res) => {
		res.clearCookie("user");
		res.cookie("notify", {
			status: "success",
			message: "Logged out",
		});
		res.redirect("/");
	});

	app.get("/create/course", createPOST.get);
	app.post("/create/course", validatePOST.course(), createPOST.post);

	app.get("/edit/course/:id", editPOST.get);
	app.post("/edit/course/:id", validatePOST.course(), editPOST.post);

	app.get("/delete/course/:id", deletePOST);

	app.get("/enroll/:id", enrollPOST);

	app.get("*", function (req, res) {
		let context = {};
		res.show = "none";
		if (res.user) {
			context.loggedIn = true;
		}
		res.render("404", context);
	});
};

// const createPOST = require("../controllers/createPOST");
// const detailsGET = require("../controllers/detailsGET");

// 		if (req.cookies.status) {
// 			let status = req.cookies.status;
// 			res.clearCookie("status");

// 			res.show = status.type;
// 			res.message = status.message;
// 		}
// 		if(res.show == undefined) {
// 			res.show = "none";
// 		}
// 		next();
// 	}
// });

// app.get("/create", function (req, res) {
// 	res.render("create");
// });

// app.post("/create", function (req, res) {
// 	res.redirect("/");
// });
// app.post("/create/course", createPOST);

// app.get("/test", function (req, res) {
// 	Course.find({});
// });

// app.get("/details/:id", detailsGET);

// app.get("/details/:id", function (req, res) {
// 	// let course = {
// 	// 	title: "Handlebars",
// 	// 	description: "description",
// 	// 	imgUrl: "imgUrl",
// 	// };

// 	// let context = {
// 	// 	...course,
// 	// };
// 	res.render("details");
// });

// app.get("/edit", function (req, res) {
// 	res.render("edit");
// });

// app.get("/login", function (req, res) {
// 	res.render("login");
// });

// app.get("/register", function (req, res) {
// 	res.render("register");
// });

//     app.post("/create",createCOURSE);

//     app.get("/details/:id",detailsGET);

// app.get(“/delete/:id”,courseDELETE);

// app.edit(“/edit/:id”,courseEDIT);

// 	app.get("*", function (req, res) {
// 		res.render("404");
// 	});
// };

// constructor(
//     title,
//     description,
//     imgUrl,
//     isPublic,
//     createdAt,
//     usersEnrolled
// ) {
//     this.id = makeRandomNum(title);
//     this.title = title;
//     this.description = description;
//     this.imgUrl = imgUrl;
//     this.isPublic = isPublic;
//     this.createdAt = createdAt;
//     this.usersEnrolled = usersEnrolled;
// }
