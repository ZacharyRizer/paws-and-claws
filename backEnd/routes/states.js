const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");

const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken, requireUserAuth } = require("../auth");
const db = require("../db/models");

const router = express.Router();

const { State } = db;

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const states = await State.findAll();
    res.json({ states });
  })
);

module.exports = router;