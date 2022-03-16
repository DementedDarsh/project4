//* dependencies
require("dotenv").config();
const { urlencoded } = require("express");
const path = require("path");
const express = require("express");
const session = require("express-session");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const monsterController = require("./controllers/monsterController");
const weaponController = require("./controllers/weaponController");
const scoresController = require("./controllers/scoresController");
const adminController = require("./controllers/adminController");
const userController = require("./controllers/userController");

//* config
const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

//* CONNECT MONGODB
mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongodb not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongoose at " + MONGODB_URI);
});

//* middleware
app.use(express.static(path.join(__dirname, "./client/build")));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(urlencoded({ extended: false }));

//* Middleware for routes
app.use("/api/monster", monsterController);
app.use("/api/weapon", weaponController);
app.use("/api/scores", scoresController);
app.use("/api/user", userController);
app.use("/api/admin", adminController);

//* routes
app.use("/api/test", (req, res) => {
  res.send("test route is working");
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

//* listen
app.listen(PORT, () => {
  console.log("app is listening on:", PORT);
});
