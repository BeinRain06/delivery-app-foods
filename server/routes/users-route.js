const express = require("express");

require("dotenv").config();

const router = express.Router();

const bcrypt = require("bcryptjs");

const User = require("../models/user");

const Favourite = require("../models/favourite");

// middleware that is specific to this router
const middlewareUser = router.use(express.urlencoded({ extended: false }));

// install and require npm **jsonwebtoken** package
const jwt = require("jsonwebtoken");

const createToken = (id, isAdmin) => {
  const secret = process.env.secret;
  // jwt signing
  return jwt.sign(
    {
      id,
      isAdmin,
    },
    secret,
    { expiresIn: "3d" }
  );
};

/*get Favourites*/

//GET all

router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash");

    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: "Error: cannot list users" });
  }
});

// User login

router.get("/login", async (req, res) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({ email }).select("-passwordHash");

    const maxAge = 3 * 1000 * 60 * 60 * 24; // 3days in ms
    //jwt signing
    const token = createToken(user.id, user.isAdmin);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });

    res.json({ success: true, data: user });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error: cannot find  user " });
    console.log(err);
  }
});

//POST user( create)
/*new user*/
router.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    let user = new User({
      name: req.body.name,
      passwordHash: bcrypt.hashSync(password, 10),
      city: req.body.city,
      street: req.body.street,
      country: req.body.country,
      phone: req.body.phone,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
    });

    user = await user.save();

    const maxAge = 3 * 1000 * 60 * 60 * 24; // 3days in ms
    //jwt signing
    const token = createToken(user.id, user.isAdmin);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error: cannot create  user " });
    console.log(err);
  }
});

/*simple sign in (useremail, userpassword) */
router.post("/login", async (req, res) => {
  try {
    //find user by email
    const user = await User.findOne({ email: req.body.email }).populate();

    const secret = process.env.secret;

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Error: user doesn't exist or incorrect email",
      });
    }
    //compare password enter with the existing one in data using bcrypt
    if (user && bcrypt.comparSync(req.body.password, user.passwordHash)) {
      const maxAge = 3 * 1000 * 60 * 60 * 24; // 3days in ms
      //jwt signing
      const token = createToken(user.id, user.isAdmin);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });

      return res.status(200).json({
        success: true,
        message: "User Authenticated!",
        data: data,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: " Incorrect User password",
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error: cannot find  user " });
    console.log(err);
  }
});

//PUT(update user)
router.put("/register:userId", async (req, res) => {
  try {
    let newPassword;
    const userId = req.params.userId;
    const userExist = await User.findById(userId);

    if (req.body.isAdmin) {
      throw new Error("Invalid Update! Specifying Admin parameter");
    }
    if (req.body.password === "") {
      throw new Error("Empty String! Cannot be password");
    } else if (req.body.password.length < 6) {
      throw new Error("password is at least 6 characters!");
    } else {
      newPassword = req.body.password;
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        passwordHash: bcrypt.hashSync(newPassword, 10),
        city: req.body.city,
        street: req.body.city,
        country: req.body.country,
        phone: req.body.phone,
        email: req.body.email,
        isAdmin: userExist.isAdmin,
      },
      { new: true }
    );

    const maxAge = 3 * 1000 * 60 * 60 * 24; // 3days in ms
    //jwt signing
    const token = createToken(user.id, user.isAdmin);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });

    res.status(200).json({
      success: true,
      data: updateUser,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error: cannot update  user " });
    console.log(err);
  }
});

//delete User (quite for Admin)
router.delete("/:userId", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error: cannot delete  user " });
    console.log(err);
  }
});

/*get Favourites*/

//GET an User favourite
router.get("/favourites:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    /* const favourites = await Favourite.findBy({}).sort({ ratings: -1 }).limit(3); */
    const user = await User.findById(userId).populate({
      path: "favourites",
      populate: {
        path: "meal",
        populate: ["name", "origin", "longDesc", "ratings"],
      },
    });

    const favourites = user.favourites;

    res.json({ success: true, data: favourites });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error: cannot find  user favourites" });
  }
});

module.exports = router;
