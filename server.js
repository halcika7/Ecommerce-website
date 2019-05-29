const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const app = express();
const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);

// routes
const users = require("./routes/api/users");
const permissions = require("./routes/roles&permissions/permissions");
const roles = require("./routes/roles&permissions/roles");
const productsCategory = require("./routes/products/category");
const categoryIcon = require("./routes/products/categoryicon");
const brand = require("./routes/products/brand");
const product = require("./routes/products/product");
const filterproducts = require("./routes/products/filterproducts");
const productreview = require("./routes/products/productreview")(io);
const answers = require("./routes/answers/answers");

// cron jobs
const dailyWeeklyOffer = require('./cronJobs/product').dailyWeeklyOffer;




app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/rolespermissions/permissions", permissions);
app.use("/rolespermissions/roles", roles);
app.use("/products/category", productsCategory);
app.use("/products/categoryicon", categoryIcon);
app.use("/products/brand", brand);
app.use("/products/product", product);
app.use("/products/product/filter", filterproducts);
app.use("/products/product", productreview);
app.use("/answers/", answers);

const port = process.env.PORT || 5000;

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log("MongoDB connected !")
  })
  .catch(err => console.log(err));
  
server.listen(port, () => console.log(`Server running on port ${port}`));
