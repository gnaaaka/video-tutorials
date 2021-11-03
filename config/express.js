const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const mongoose = require("mongoose");

module.exports = (app) => {
	app.engine(
		"hbs",
		handlebars({
			extname: "hbs",
		})
	);

	app.set("view engine", "hbs");
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(express.static("static"));
	app.use("/static", express.static("static"));
	app.use("/static", express.static(__dirname + "/static"));
	app.use(cookieParser());
};
