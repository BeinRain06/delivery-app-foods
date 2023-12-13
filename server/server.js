//route domains
const mealsRouter = require("./routes/meals-route");

const categoriesRouter = require("./routes/categories-route");

const favouritesRouter = require("./routes/favourites-route");

const ordersRouter = require("./routes/orders-route");

const userRouter = require("./routes/users-route");

const userRatingRouter = require("./routes/ratings-user-route");

const ratingRouter = require("./routes/ratings-route");

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
    callback(null, __dirname + "/public/images");
  },
  filename: function (req, file, callback) {
    const filename = `${file.fieldname}_${Date.now()}${path.extname(
      file.originalname
    )}`;
    callback(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1048576,
  },
});
app.post("/upload/meal/image", upload.single("meal"), function (req, res) {
  res.json({
    success: true,
    profile_url: `http://localhost:5000/meal/${req.file.filename}`,
  });
});

// Alias New Routes middleware
app.use(`${api}/meals`, mealsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/favourites/users`, favouritesRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/orders/payments`, paymentRouter);
app.use(`${api}/users`, userRouter);
app.use(`${api}/users/ratings/rating`, userRatingRouter);
app.use(`${api}/users/ratings`, ratingRouter);
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
