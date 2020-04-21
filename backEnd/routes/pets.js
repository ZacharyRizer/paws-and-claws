const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");

const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken, requireUserAuth, requireShelterAuth } = require("../auth");
const db = require("../db/models");
const { Pet } = db

const router = express.Router();

router.use(requireShelterAuth);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const pets = await Pet.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json({ pets });
  })
);

const petNotFoundError = (id) => {
  const err = Error("Pet not found");
  err.errors = [`Pet with id of ${id} could not be found.`];
  err.title = "Pet not found.";
  err.status = 404;
  return err;
};

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const pet = await Pet.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (pet) {
      res.json({ pet });
    } else {
      next(petNotFoundError(req.params.id));
    }
  })
);

const validatePet = [
  check("breedId")
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for breed'),
  check("petName")
    .exists({ checkFalsy: true })
    .withMessage('Please provide a name for the pet')
    .isLength({ max: 255 })
    .withMessage('Pet Name must not be more than 128 characters long'),
  check("age")
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for age'),
  check("sex")
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for sex'),
  check("size")
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for size'),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage('Please provide a description for the pet'),
  check("photo")
    .exists({ checkFalsy: true })
    .withMessage('Please provide a url link to the pet\'s photo')
    .isURL()
    .withMessage('Please provide a value URL'),
  check("isOkayPets")
    .exists({ checkFalsy: true })
    .withMessage('Please indicate whether the pet is okay with other pets'),
  check("isOkayKids")
    .exists({ checkFalsy: true })
    .withMessage('Please indicate whether the pet is okay with children'),

  handleValidationErrors,
];

router.post(
  "/",
  validatePet,
  asyncHandler(async (req, res) => {
    const {
      breedId,
      petName,
      age,
      sex,
      size,
      description,
      photo,
      isAdopted,
      isOkayPets,
      isOkayKids
    } = req.body;
    const pet = await Pet.create({
      breedId,
      petName,
      age,
      sex,
      size,
      description,
      photo,
      isAdopted,
      isOkayPets,
      isOkayKids,
      shelterId: req.user.id
    });
    res.json({ pet });
  })
);

router.put(
  "/:id",
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    const pet = await Pet.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (req.user.id !== pet.shelterId) {
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You are not authorized to edit this pet\'s information.";
      err.title = "Unauthorized";
      throw err;
    }
    if (pet) {
      await pet.update({
        petName: req.body.petName,
        photo: req.body.photo,
        isAdopted: req.body.isAdopted
      });
      res.json({ pet });
    } else {
      next(petNotFoundError(req.params.id));
    }
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const pet = await Pet.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (req.user.id !== pet.shelterId) {
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You are not authorized to delete this pet.";
      err.title = "Unauthorized";
      throw err;
    }
    if (pet) {
      await pet.destroy();
      res.json({ message: `Deleted pet with id of ${req.params.id}.` });
    } else {
      next(petNotFoundError(req.params.id));
    }
  })
);

module.exports = router;