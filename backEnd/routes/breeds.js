const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");

const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken, requireUserAuth } = require("../auth");
const db = require("../db/models");

const router = express.Router();

const { Breed } = db;

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const breeds = await Breed.findAll();
    res.json({ breeds });
  })
);

module.exports = router;
