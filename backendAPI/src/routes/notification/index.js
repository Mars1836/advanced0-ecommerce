const express = require("express");
const { authenticationV2, verifyAsShop } = require("../../auth/authUtils");
const NotificationController = require("../../controllers/notification.controller");
const asyncHandler = require("../../helpers/async.handler");
const router = express.Router();
//authentication as user
router.get("/all", asyncHandler(NotificationController.getAll));
router.get("", asyncHandler(NotificationController.getByUser));
router.post(
  "/shop",
  asyncHandler(verifyAsShop),
  asyncHandler(NotificationController.createByShop)
);
router.post("/test", asyncHandler(NotificationController.testRb));

module.exports = router;
