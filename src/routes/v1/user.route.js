
const express = require("express");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/user.controller");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.get(
  "/:userId",
  auth(),
  validate(userValidation.getUser),
  userController.getUser
);

//this route helps to add word to fav list of words.
router.post(
  "/add-to-fav/:userId",
  auth(),
  userController.setfavoriteWords
);

// Supports updating address only currently
router.put(
  "/edit-user/:userId",
  auth(),
  userController.editUser
);

module.exports = router;
