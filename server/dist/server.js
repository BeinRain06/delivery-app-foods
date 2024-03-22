"use strict";

//route domains
var mealsRouter = require("./routes/meals-route");
var categoriesRouter = require("./routes/categories-route");
var ordersRouter = require("./routes/orders-route");
var userRouter = require("./routes/users-route");
var ratedMealRouter = require("./routes/rated-meal-route");
var ratingsRouter = require("./routes/ratings-route");
var paymentRouter = require("./routes/payments-route");
var requireAuthJwt = require("./protect-api/jwt");
var errorHandler = require("./protect-api/error-handler");

// express Brain

var express = require("express");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv").config();
app.use(cors({
  origin: ["http://localhost:5000", "http://localhost:3000", "http://localhost:5173"],
  credentials: true
}));
app.use(cookieParser());
var PORT = process.env.PORT;
var api = process.env.API_BASE_URL;

//implement multer
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function destination(req, file, callback) {
    callback(null, "public/images/meats");
  },
  filename: function filename(req, file, callback) {
    var filename = "".concat(file.fieldname, "_").concat(Date.now()).concat(path.extname(file.originalname));
    callback(null, filename);
  }
});

//configure multer to upload in remote_url
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 100000
  }
});

//post single image with multer
/* upload.single("dessert");
upload.single("meat");
upload.single("vegetarian");
upload.single("seafood"); */
app.post("/api/delivery/picture", upload.single("meat"), function (req, res) {
  console.log(req.file);
  res.json({
    success: true,
    /*   profile_url: `/api/delivery/picture/${req.file.filename}`, //fetching url img_name path */

    profile_url: "/api/delivery/images/".concat(req.file.filename) //fetching url img_name path
  });
});

//BASE_URL to print image in browse

app.use("/api/delivery/images", express["static"]("public/images/meats"));
app.use("/api/delivery/images", express["static"]("public/images/vegetarians"));
app.use("/api/delivery/images", express["static"](__dirname + "/public/images/desserts"));
app.use("/api/delivery/images", express["static"](__dirname + "/public/images/seafoods"));

/* app.use("/api/delivery/images", express.static("public/images/desserts")); */ //e.g : http://localhost:5000/api/delivery/images/dessert_1702648345030.jpeg

// Alias New Routes middleware
app.use("".concat(api, "/meals"), mealsRouter);
app.use("".concat(api, "/categories"), categoriesRouter);
app.use("".concat(api, "/orders"), ordersRouter);
app.use("".concat(api, "/payments"), paymentRouter);
app.use("".concat(api, "/users"), userRouter);
app.use("".concat(api, "/ratings"), ratingsRouter);
app.use("".concat(api, "/ratedmeals"), ratedMealRouter);

// middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
/* app.use(bodyParser.json()); */
app.use(requireAuthJwt());
app.use(errorHandler);

//middleware display index.html
app.use("/website/html", express["static"](path.join(__dirname, "public")));
app.get("/", function (req, res) {
  res.json({
    users: "Hello My Back!"
  });
});

//mongoDB connect call &  nodejs server listening port
var connectDB = require("./config/db");
connectDB().then(function () {
  return app.listen(PORT, function () {
    console.log("server running on port ".concat(PORT));
  });
});

/* app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
}); */