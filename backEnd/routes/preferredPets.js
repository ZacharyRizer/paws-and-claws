const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");

const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken, requireUserAuth, requireShelterAuth } = require("../auth");
const db = require("../db/models");

const router = express.Router();

const { UserPetPreference, User } = db;

router.use(requireUserAuth);

router.post(
  "/",
  check("breedId")
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for breed'),
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const {
      breedId,
      age,
      sex,
      size,
      isOkayPets,
      isOkayKids
    } = req.body;
    const pref = await UserPetPreference.create({
      breedId,
      age,
      sex,
      size,
      isOkayPets,
      isOkayKids,
      userId: req.user.id
    });
    res.json({ pref });
  })
);

router.put(
  "/:id",
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    const pref = await UserPetPreference.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (req.user.id !== pref.userId) {
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You are not authorized to edit this pet\'s information.";
      err.title = "Unauthorized";
      throw err;
    }
    if (pref) {
      await pref.update({
        breedId: req.body.breedID,
        age: req.body.age,
        sex: req.body.sex,
        size: req.body.size,
        isOkayPets: req.body.isOkayPets,
        isOkayKids: req.body.isOkayKids
      });
      res.json({ pref });
    } else {
      next(petNotFoundError(req.params.id));
    }
  })
);

module.exports = router;