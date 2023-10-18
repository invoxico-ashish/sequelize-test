const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const userController = require("./Controllers/userController")
require("./models")

app.get("/", function (req, res) {
	res.send("hello sequelize");
});
app.get("/add", userController.addUser);
app.get("/insert", userController.validationCon);
app.get("/rowQuery", userController.rowQuery);
app.get("/onetoone", userController.onToOne);
app.get("/belongsTo", userController.belongsTo);
app.get("/onetomany", userController.oneToMany);
app.get("/manytomany", userController.ManyToMany);

app.listen(port, function () {
	console.log(`server is running on ${port}`);
});
