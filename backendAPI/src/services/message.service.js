const { BadRequestError } = require("../core/error.response");
const conversationModel = require("../models/conversation.model");
const messageModel = require("../models/message.model");
const ConversationService = require("./conversation.service");

class MessageService {
  static async create({ userId }, { type = "text", conversationId, content }) {
    console.log(conversationId, content);
    const conversationStored = await conversationModel.findById(conversationId);
    if (!conversationStored) {
      throw new BadRequestError("Convertion is not exist");
    }
    const isExist = conversationStored.participants.find((obId) => {
      return obId.toString() === userId;
    });
    console.log(conversationStored.participants);
    if (!isExist) {
      throw new BadRequestError("User is not in this convertions");
    }
    const newMessage = await messageModel.create({
      sender_id: userId,
      conversation_id: conversationId,
      content,
      type,
    });
    if (newMessage) {
      conversationStored.lastMessage = newMessage.content;
      await conversationStored.save();
      return newMessage;
    }
  }
  static async getByConversation({ userId }, { conversationId }) {
    const room = await ConversationService.findByIdAsRoom(
      { userId },
      { conversationId }
    );

    const messages = await messageModel
      .find({
        conversation_id: conversationId,
      })
      .populate({ path: "sender_id", select: "name _id avatar" })
      .lean();

    return { room: room, messages: handleDataMessage(userId, messages) };
  }
}
function handleDataMessage(userId, messages) {
  const a = messages.map((message) => {
    return {
      ...message,
      user: message.sender_id,
      isSender: userId.toString() === message.sender_id._id.toString(),
    };
  });
  return a;
}
module.exports = MessageService;
