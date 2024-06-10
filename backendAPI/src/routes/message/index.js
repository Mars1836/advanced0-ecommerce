const express = require("express");
const { verifyAsUser } = require("../../auth/authUtils");
const asyncHandler = require("../../helpers/async.handler");
const MessageController = require("../../controllers/message.controller");
const router = express.Router();
//authentication as user
router.post(
  "/send",
  asyncHandler(verifyAsUser),
  asyncHandler(MessageController.create)
);
router.get(
  "/conversation/:conversationId",
  asyncHandler(verifyAsUser),
  asyncHandler(MessageController.getByConversation)
);

module.exports = router;
