const express = require("express");
const { verifyAsUser } = require("../../auth/authUtils");
const asyncHandler = require("../../helpers/async.handler");
const ConversationController = require("../../controllers/conversation.controller");
const router = express.Router();
//authentication as user
router.post(
  "/private",
  asyncHandler(verifyAsUser),
  asyncHandler(ConversationController.createPrivateConversation)
);
router.get(
  "/",
  asyncHandler(verifyAsUser),
  asyncHandler(ConversationController.findByUser)
);

module.exports = router;
