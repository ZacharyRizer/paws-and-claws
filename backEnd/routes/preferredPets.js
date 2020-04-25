const express = require("express");
const { check } = require("express-validator");

const { asyncHandler, handleValidationErrors } = require("../utils");
const { requireUserAuth } = require("../auth");
const db = require("../db/models");

const router = express.Router();

const { UserPetPreference, User } = db;

router.use(requireUserAuth);

const prefNotFoundError = (id) => {
  const err = new Error("Not Found");
  err.status = 404;
  err.message = "No pet preference was found for this user";
  err.title = "No Preference";
  return err;
};

router.get("/:id", asyncHandler(async (req, res, next) => {
  const userId = parseInt(req.params.id, 10);
  const petPref = await UserPetPreference.findOne({
    where: {
      userId: userId,
    },
  });

  if (petPref) {
    res.json({ petPref });
  } else {
    next(prefNotFoundError(req.params.id));
  }
}));

router.post(
  "/",
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
    const userId = req.user.id;
    const pref = await UserPetPreference.findOne({
      where: {
        userId: userId,
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
        breedId: req.body.breedId,
        age: req.body.age,
        sex: req.body.sex,
        size: req.body.size,
        isOkayPets: req.body.isOkayPets,
        isOkayKids: req.body.isOkayKids,
      });
      res.json({ pref });
    } else {
      next(prefNotFoundError(req.params.id));
    }
  })
);

module.exports = router;