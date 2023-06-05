var express = require("express"),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser");
const User = require("./model/User");
var app = express();

app.use(express.static('static'));

mongoose.connect("mongodb://127.0.0.1/27017");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

//=====================
// ROUTES
//=====================

// Showing home page
app.get("/", function (req, res) {
	res.render("home");
});

app.get("/home", function (req, res) {
	res.redirect("home.html");
});
app.get("/registersuccess", function (req,res){
	res.render("register_success");
});
// Showing register form
app.get("/register", function (req, res) {
	res.render("register");
});

// Handling user signup
app.post("/register", async (req, res) => {
	const user = await User.create({
		username: req.body.username,
		password: req.body.password
	});

	return res.redirect("/registersuccess")
});

//Showing login form
app.get("/login", function (req, res) {
	res.render("login");
});

//Handling user login
app.post("/login" ,async function (req, res) {
	try {
		// check if the user exists
		const user = await User.findOne({ username: req.body.username });
		if (user) {
			//check if password matches
			const result = req.body.password === user.password;
			if (result) {
				res.redirect("home.html");
			} else {
				res.render("invalidlogin")
			}
		} else {
			res.render("invalidlogin");
		}
	} catch (error) {
		res.status(400).json({ error });
	}
});

//Handling user logout
app.get("/logout", function (req, res) {
	req.logout(function (err) {
		if (err) { return next(err); }
		res.redirect('/');
	});
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Server Has Started!");
});
