const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");

const { asyncHandler, handleValidationErrors, validatePassword } = require("../utils");
const { getUserToken, requireUserAuth } = require("../auth");
const db = require("../db/models");

const router = express.Router();

const { User, AdoptionRequest, UserPetPreference } = db;

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
  const userId = parseInt(req.user.id, 10);

  if (!req.user || req.user.id !== userId || req.role !== "User") {
    const err = new Error("Unauthorized");
    err.status = 401;
    err.message = "You do not have permission(s) to do that.";
    err.title = "Unauthorized";
    throw err;
  }

  const user = await User.findByPk(userId, {
    attributes: {
      exclude: ["hashedPassword"],
    },
    include: AdoptionRequest, UserPetPreference
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
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      }
      return true;
    }),
  validateLoginInfo,
  asyncHandler(async (req, res, next) => {
    const { email, username, password, firstName, lastName, phoneNum } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, username, hashedPassword, firstName, lastName, phoneNum })

    const token = getUserToken(user);
    const role = "Adopter";
    res
      .status(201)
      .json({
        user: { id: user.id },
        role,
        token,
        name: username,
      })
  }));

router.post("/token", asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email },
  });
  console.log(user.hashedPassword)

  if (!user || !validatePassword(password, user.hashedPassword)) {
    const err = new Error("Failed to log in.");
    err.errors = ["The provided credentials were invalid"];
    err.status = 401;
    err.title = "Login failed.";
    return next(err);
  }
  const token = getUserToken(user);
  const role = "Adopter";
  res.json({
    token,
    role,
    user: { id: user.id },
    name: user.username
  });
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
    next(userNotFound(userId));
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