const {
  SuccessResponse,
  CreateRequestSuccess,
} = require("../core/success.response");
const ConversationService = require("../services/conversation.service");

class ConversationController {
  static async createPrivateConversation(req, res, next) {
    const metadata = await ConversationService.createPrivateConversation(
      { userId: req.user.ob.id },
      req.body
    );
    new CreateRequestSuccess({
      message: "Created new conversation",
      metadata,
    }).send(res);
  }
  static async findByUser(req, res, next) {
    const metadata = await ConversationService.findByUser({
      userId: req.user.ob.id,
    });
    new SuccessResponse({
      message: "Get conversations successful",
      metadata,
    }).send(res);
  }
}
module.exports = ConversationController;
