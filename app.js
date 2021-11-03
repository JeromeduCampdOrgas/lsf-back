const express = require("express");
const helmet = require("helmet");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const UserModel = require("./models/user.model");

const mongoose = require("mongoose");

const path = require("path");
const userRoutes = require("./routes/user.routes");
const chienRoutes = require("./routes/chien.routes");
const refugeRoutes = require("./routes/refuge.routes");

const app = express();

app.use(helmet());

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USER +
      ":" +
      process.env.DB_PASS +
      "@" +
      process.env.DB_URI +
      "/" +
      process.env.DB_NAME +
      "?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connexion à MongoDB réussie !");
  })
  .catch(() => {
    console.log(
      "mongodb+srv://" +
        process.env.DB_USER +
        ":" +
        process.env.DB_PASS +
        "@" +
        process.env.DB_URI +
        "/" +
        process.env.DB_NAME +
        "?retryWrites=true&w=majority"
    );
    console.log("Connexion à MongoDB échouée !");
  });

/*mongoose
  .connect(
    "mongodb+srv://test:test@cluster0.9pori.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));*/

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));
//routes
app.use("/api/user", userRoutes);
app.use("/api/chien", chienRoutes);
app.use("/api/refuges", refugeRoutes);

module.exports = app;
