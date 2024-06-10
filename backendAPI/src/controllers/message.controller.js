const {
  SuccessResponse,
  CreateRequestSuccess,
} = require("../core/success.response");
const MessageService = require("../services/message.service");

class MessageController {
  static async create(req, res, next) {
    const metadata = await MessageService.create(
      { userId: req.user.ob.id },
      req.body
    );
    new CreateRequestSuccess({
      message: "Created new message",
      metadata,
    }).send(res);
  }
  static async getByConversation(req, res, next) {
    const { conversationId } = req.params;
    const metadata = await MessageService.getByConversation(
      { userId: req.user.ob.id },
      { conversationId }
    );
    new SuccessResponse({
      message: "Get message successful",
      metadata,
    }).send(res);
  }
}
module.exports = MessageController;
