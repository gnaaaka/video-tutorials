const env = process.env.NODE_ENV || "development";

const config = require("./config/config")[env];
const app = require("express")();

require("./config/db")(app);
require("./config/express")(app);
require("./config/routes")(app);

console.log("hello");

app.listen(config.port, console.log(`Server is on port: ${config.port}`));

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;

// const express = require("express");
// const mongoose = require("mongoose");
// const handlebars = require("express-handlebars");
// // const app = require("express")();
// // const app = express();
// const port = 3000;

// app.use(express.json());

// app.set("view engine", "hbs");

// app.engine(
// 	"hbs",
// 	handlebars({
// 		layoutsDir: __dirname + "/views/layouts",
// 		extname: "hbs",
// 		partialsDir: __dirname + "/views/partials/",
// 	})
// );

// app.use(express.static("static"));

// const uri = "mongodb://localhost:27017";

// const connectionParams = {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// };

// mongoose.connect(uri, connectionParams);

// const connection = mongoose.connection;
// connection.once("open", () => {
// 	console.log("MongoDB database connection established successfully");
// });

// app.get("/", (listener, response) => {
// 	response.render("index", { layout: "main" });
// });

// app.get("/create", (listener, response) => {
// 	response.render("create", { layout: "main" });
// });

// app.get("/details", (listener, response) => {
// 	response.render("details", { layout: "main" });
// });

// app.get("/edit", (listener, response) => {
// 	response.render("edit", { layout: "main" });
// });

// app.get("/login", (listener, response) => {
// 	response.render("login", { layout: "main" });
// });

// app.get("/register", (listener, response) => {
// 	response.render("register", { layout: "main" });
// });

// module.exports = (app) => {
// 	mongoose.connect("mongodb://localhost:27017");
// };

// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017");

// app.listen(port, () => {
// 	console.log(`Server is on port: ${port}`);
// });
