const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");

const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken, requireUserAuth } = require("../auth");
const db = require("../db/models");

const router = express.Router();

const { User, AdoptionRequest } = db;

const userNotFound = userId => {
  const err = new Error("User not found");
  err.errors = [`User with id: ${userId} could not be found.`];
  err.title = "User not found.";
  err.status = 404;
  return err;
}

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

router.post("/token", requireUserAuth, asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email },
  });

  if (!user || !user.validatePassword(password)) {
    next(userNotFound(userId));
  }
  const token = getUserToken(user);
  res.json({ token, user: { id: user.id } });
}));

router.put("/:id", requireUserAuth, asyncHandler(async (req, res, next) => {
  const userId = parseInt(req.params.id, 10);
  const user = await User.findByPk(userId);
  if (user) {
    let hashedPassword;
    if (req.body.password) {
      hashedPassword = await bcrypt.hash(req.body.password, 10);
    }

    await user.update({
      email: req.body.email,
      username: req.body.username,
      hashedPassword: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    const updatedUser = await User.findByPk(userId, {
      attributes: { exclude: ["hashedPassword"] }
    });
    res.json({ updatedUser });
  } else {

  }
}));

router.delete("/:id(\\d+)", requireUserAuth, asyncHandler(async (req, res, next) => {
  const userId = parseInt(req.params.id, 10);
  const user = await User.findByPk(userId);

  if (user) {
    const adoptionRequests = await AdoptionRequest.findAll({
      where: {
        userId: userId,
      }
    });
    adoptionRequests.forEach(async request => await request.destroy());

    const petPref = await petPref.findAll({
      where: {
        userId: userId,
      }
    });

    await petPref.destroy();
    await user.destroy();
    res.status(204).end();
  } else {
    next(userNotFound(userId));
  }
})
);

module.exports = router;