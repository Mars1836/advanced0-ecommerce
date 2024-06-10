const express = require("express");
const UserController = require("../../controllers/user.controller");
const asyncHandler = require("../../helpers/async.handler");
const { verifyAsUser } = require("../../auth/authUtils");
const router = express.Router();
router.post(
  "/email/register",
  asyncHandler(UserController.createWithVerifyEmail)
);
router.get(
  "/verify/register",
  asyncHandler(UserController.checkVerifyEmailForCreate)
);
router.post(
  "/follow",
  asyncHandler(verifyAsUser),
  asyncHandler(UserController.followShop)
);
router.post(
  "/unfollow",
  asyncHandler(verifyAsUser),
  asyncHandler(UserController.unFollowShop)
);

router.post("", asyncHandler(UserController.register));

module.exports = router;
