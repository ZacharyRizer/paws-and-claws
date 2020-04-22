const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");

const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken, requireUserAuth, requireShelterAuth } = require("../auth");
const db = require("../db/models");

const router = express.Router();
// router.use(requireShelterAuth);

const { AdoptionRequest, Pet } = db;
// GET - shelter gets all the adoption requests

router.get('/', asyncHandler(async (req, res) => {
  const adoptionRequests = await AdoptionRequest.findAll({
    order: [["createdAt", "DESC"]],
    include: [{ model: Pet, attributes: ['petName'] }],
    where: { shelterId: req.user.id }
  });
  res.json({ adoptionRequests });
}));

// Adoption request not found
const adoptionRequestNotFoundError = (id) => {
  const err = Error("Adoption Request not found");
  err.errors = [`Adoption Request with id of ${id} could not be found.`];
  err.title = "Adoption Request not found.";
  err.status = 404;
  return err;
};

// GET for a specific adoption request to display for shelter to read
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const adoptionRequestId = parseInt(req.params.id, 10);
    const adoptionRequest = await AdoptionRequest.findByPk(adoptionRequestId);
    if (adoptionRequest) {
      res.json({ adoptionRequest });
    } else {
      next(adoptionRequestNotFoundError(req.params.id));
    }
  })
);

router.post('/',
  check("message")
    .exists({ checkFalsy: true })
    .withMessage('Please leave a message.'),
  requireUserAuth,
  asyncHandler(async (req, res) => {
    if (req.user === undefined) {
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You must be logged in to do that.";
      err.title = "Unauthorized";
      throw err;
    }
    const userId = req.user.id;

    const {
      petId,
      shelterId,
      message,
      isAccepted,
    } = req.body;

    const adoptionRequests = await AdoptionRequest.findAll({
      where: {
        userId: userId,
      }
    });

    adoptionRequests.forEach(request => {
      if (request.dataValues.petId == petId && request.dataValues.shelterId == shelterId) {
        const err = new Error("Duplicate");
        err.status = 409;
        err.message = "This is a duplicate request."
        err.title = "Duplicate";
        throw err;
      }
    });

    const adoptionRequest = await AdoptionRequest.create({
      userId,
      petId,
      shelterId,
      message,
      isAccepted,
    });

    res.json({ adoptionRequest });
  })
)
//Update adoption request - shelter user only.
router.put('/:id(\\d+)',
  check("isAccepted")
    .exists({ checkFalsy: true })
    .withMessage("Please make your decision."),
  requireShelterAuth,
  asyncHandler(async (req, res, next) => {
    const adoptionRequestId = parseInt(req.params.id, 10);
    const adoptionRequest = await AdoptionRequest.findByPk(adoptionRequestId);

    if (req.user.id !== adoptionRequest.shelterId) {
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You are not authorized to edit this adoption request.";
      err.title = "Unauthorized";
      throw err;
    }
    if (adoptionRequest) {
      await adoptionRequest.update({
        isAccepted: req.body.isAccepted,
      })
      res.json({ adoptionRequest });
    } else {
      next(adoptionRequestNotFoundError(adoptionRequestId))
    }
  }));

//Delete adoption request
router.delete('/:id(\\d+)', requireShelterAuth, asyncHandler(async (req, res) => {
  const adoptionRequestId = parseInt(req.params.id, 10);
  const adoptionRequest = await AdoptionRequest.findByPk(adoptionRequestId);

  if (req.user.id !== adoptionRequest.shelterId) {
    const err = new Error("Unauthorized");
    err.status = 401;
    err.message = "You are not authorized to delete this adoption request.";
    err.title = "Unauthorized";
    throw err;
  }
  if (adoptionRequest) {
    await adoptionRequest.destroy();
    res.json({ message: `Deleted adoption request with id of ${adoptionRequestId}.` });
  } else {
    next(adoptionRequestNotFoundError(adoptionRequestId));;
  }
}));

module.exports = router;