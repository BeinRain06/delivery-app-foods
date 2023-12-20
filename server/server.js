//route domains
const mealsRouter = require("./routes/meals-route");

const categoriesRouter = require("./routes/categories-route");

const favouritesRouter = require("./routes/favourites-route");

const ordersRouter = require("./routes/orders-route");

const userRouter = require("./routes/users-route");

const ratedMealRouter = require("./routes/rated-meal-route");

const ratingsRouter = require("./routes/ratings-route");

const paymentRouter = require("./routes/payments-route");

const authJwt = require("./protect-api/jwt");

const errorHandler = require("./protect-api/error-handler");

// express Brain

const express = require("express");

const app = express();

const path = require("path");

const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT;

const api = process.env.API_BASE_URL;

//mongoD connect call
const connectDB = require("./config/db");

connectDB();

//implement multer
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/images/meats");
  },
  filename: function (req, file, callback) {
    const filename = `${file.fieldname}_${Date.now()}${path.extname(
      file.originalname
    )}`;

    callback(null, filename);
  },
});

//configure multer to upload in remote_url
const upload = multer({
  storage: storage,

  limits: { fileSize: 100000 },
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
    profile_url: `/api/delivery/picture/${req.file.filename}`, //fetching url img_name path
  });
});

//BASE_URL to print image in browse

app.use("/api/delivery/images", express.static("public/images/meats"));

/* app.use("/api/delivery/images", express.static("public/images/desserts")); */ //e.g : http://localhost:5000/api/delivery/images/dessert_1702648345030.jpeg

/* app.use(
  "meals/picture/meat",
  express.static(__dirname + "/public/images/meat")
);
app.use(
  "meals/picture/vegetarian",
  express.static(__dirname + "/public/images/vegetarian")
);
app.use(
  "meals/picture/seafood",
  express.static(__dirname + "/public/images/seafood")
); */

// Alias New Routes middleware
app.use(`${api}/meals`, mealsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/favourites/users`, favouritesRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/orders/payments`, paymentRouter);
app.use(`${api}/users`, userRouter);
app.use(`${api}/ratings`, ratingsRouter);
app.use(`${api}/ratedmeals`, ratedMealRouter);
// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* app.use(authJwt); */
app.use(errorHandler);

//middleware display index.html
app.use("/website/html", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({ users: "Hello My Back!" });
});

app.get("/", (req, res) => {
  res.json({ users: "Hello My Back!" });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
