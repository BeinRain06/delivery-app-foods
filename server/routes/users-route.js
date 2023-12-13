const express = require("express");

require("dotenv").config();

const router = express.Router();

const bcrypt = require("bcryptjs");

const User = require("../models/user");

// middleware that is specific to this router
const middlewareUser = router.use(express.urlencoded({ extended: false }));

// install and require npm **jsonwebtoken** package
const jwt = require("jsonwebtoken");

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

//GET an User

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).select("-passwordHash");

    res.json({ success: true, data: user });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error: cannot find  user " });
    console.log(err);
  }
});

//POST user( create)
/*new user posted by Admin*/
router.post("/user", middlewareUser, async (req, res) => {
  try {
    const passwordHash = bcrypt.hashSync(req.body.password, 10);

    let user = new User({
      username: req.body.name,
      passwordHash: bcrypt.hashSync(req.body.password, 10), // install bcryptjs
      city: req.body.city,
      street: req.body.street,
      country: req.body.country,
      phone: req.body.phone,
      email: req.body.email,
      isAdmin: jwt(passwordHash),
      isAdmin: req.body.isAdmin,
    });

    user = await user.save();

    res.json({ success: true, data: user });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Error: cannot create  user " });
    console.log(err);
  }
});

//POST user( create)
/*new user*/
router.post("/register", async (req, res) => {
  try {
    let user = new User({
      username: req.body.name,
      passwordHash: bcrypt.hashSync(req.body.password, 10), // install bcryptjs
      city: req.body.city,
      street: req.body.street,
      country: req.body.country,
      phone: req.body.phone,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
    });

    user = await user.save();

    res.json({ success: true, data: user });
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
    const user = await User.finOne({ email: req.body.email });

    const secret = process.env.secret;

    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Error: user doesn't exist" });
    }
    //compare password enter with the existing one in data using bcrypt
    if (user && bcrypt.comparSync(req.body.password, user.passwordHash)) {
      const token = jwt.sign(
        {
          userId: user.id,
          isAdmin: user.isAdmin,
        },
        secret,
        { expiresIn: "1w" }
      );
      const data = { user: user.email, token: token };

      return res.status(200).json({
        success: true,
        message: "User Authenticated!",
        data: data,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "User password wrong",
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
router.put("/:userId", async (req, res) => {
  try {
    let newPassword;
    const userId = req.params.userId;
    const userExist = await User.findById(userId);

    if (req.body.password) {
      newPassword = bcrypt.hashSync(req.body.password, 10);
    } else {
      newPassword = userExist.passwordHash;
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        passwordHash: newPassword,
        city: req.body.city,
        street: req.body.city,
        country: req.body.country,
        phone: req.body.phone,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
      },
      { new: true }
    );

    res.json({
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

    res.json({
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

module.exports = router;
