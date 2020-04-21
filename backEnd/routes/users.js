const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");

const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken, requireUserAuth } = require("../auth");
const db = require("../db/models");

const router = express.Router();

const { User } = db;

const validateLoginInfo = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

router.get("/:id", requireUserAuth, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = await User.findByPk(userId, {
    attributes: { exclude: ["hashedPassword"] }
  });
  res.json({ user });
}));

router.post("/",
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username")
    .isLength({ max: 32 })
    .withMessage("Max username length is 32"),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a first name")
    .isLength({ max: 64 })
    .withMessage("Max firt name length is 64"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a last name")
    .isLength({ max: 64 })
    .withMessage("Max last name length is 64"),
  validateLoginInfo, asyncHandler(async (req, res, next) => {
    const { email, username, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, username, hashedPassword, firstName, lastName })

    const token = getUserToken(user);
    res
      .status(201)
      .json({
        user: { id: user.id },
        token,
      })
  }));

router.post("/token", validateLoginInfo, asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email },
  });

  if (!user || !user.validatePassword(password)) {
    const err = new Error("Failed to log in.");
    err.errors = ["The provided credentials were invalid"];
    err.status = 401;
    err.title = "Login failed.";

    return next(err);
  }
  const token = getUserToken(user);
  res.json({ token, user: { id: user.id } });
}));

router.put("/:id", validateLoginInfo, asyncHandler(async (req, res, next) => {
  const userId = parseInt(req.params.id, 10);
  const user = await User.findByPk(userId);
  if (user) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await user.update({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    res.json({ user });
  } else {
    const err = new Error("User not found");
    err.errors = [`User with id: ${userId} could not be found.`];
    err.title = "User not found.";
    err.status = 404;
    next(err);
  }
}));

module.exports = router;