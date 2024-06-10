const conversationModel = require("../models/conversation.model");
const userModel = require("../models/user.model");
const { BadRequestError } = require("../core/error.response");
const messageModel = require("../models/message.model");
async function handleDataConversation(userId, conversations) {
  const a = Promise.all(
    conversations.map(async (con) => {
      if (!con.isGroup) {
        const index = con.participants.findIndex((id) => {
          return id.toString() == userId;
        });
        const oindex = index ? 0 : 1;
        const user = await userModel.findById(con.participants[oindex]).lean();
        return {
          room: {
            id: con._id,
            name: user.name,
            avatar: user.avatar,
          },
        };
      }
    })
  );
  console.log(a);
  return a;
}
async function handleAPrivateConversation(userId, conversation) {
  if (!conversation.isGroup) {
    const index = conversation.participants.findIndex((id) => {
      return id.toString() == userId;
    });
    if (index === -1) {
      throw new BadRequestError("User is not in this convertions");
    }
    const oindex = index ? 0 : 1;

    const user = await userModel
      .findById(conversation.participants[oindex])
      .lean();
    return {
      id: conversation._id,
      name: user.name,
      avatar: user.avatar,
    };
  }
}
class ConversationService {
  static async findByUser({ userId }) {
    const conversationStored = await conversationModel
      .find({
        participants: { $in: userId },
      })
      .lean();
    return await handleDataConversation(userId, conversationStored);
  }
  static async findByIdAsRoom({ userId }, { conversationId }) {
    const conversationStored = await conversationModel.findById(conversationId);
    if (!conversationStored) {
      throw new BadRequestError("Conversation does not exist");
    }
    return handleAPrivateConversation(userId, conversationStored);
  }
  static async create({ participants, isGroup }) {
    if (!Array.isArray(participants)) {
      throw new BadRequestError("Participants is not valid");
    }
    if (!isGroup) {
      if (participants?.lenght > 2)
        throw new BadRequestError("Number of users is not valid");
    }
    await Promise.all(
      participants.map(async (id) => {
        const u = await userModel.findById({});
        // const s = await shopModel.findById({});
        if (!u) {
          throw new Error("User does not exist!");
        }
      })
    ); //check users exist
    const conversationStored = await conversationModel.findOne({
      isGroup: false,
      participants: { $all: [...participants] },
    });
    if (conversationStored) {
      return await conversationStored;
    }
    const a = await conversationModel.create({ participants, isGroup });
    return a;
  }
  static async createPrivateConversation({ userId }, { to }) {
    const isGroup = false;
    const participants = [userId, to];
    if (userId === to) {
      throw new BadRequestError("Sender is invalid");
    }
    await Promise.all(
      participants.map(async (id) => {
        const u = await userModel.findById(id);
        // const s = await shopModel.findById({});
        if (!u) {
          throw new Error("User does not exist!");
        }
      })
    ); //check users exist
    const conversationStored = await conversationModel.findOne({
      isGroup: false,
      participants: { $all: [...participants] },
    });
    if (conversationStored) {
      conversationStored.isDeleted = true;
      return await conversationStored.save();
    }
    const a = await conversationModel.create({ participants, isGroup });
    return a;
  }
  //   static async updateLastMessage({ convertionId, messageId }) {
  //     const conversationStored = await conversationModel.findById(convertionId);
  //     if (!conversationStored) {
  //       throw new BadRequestError("Convertion is not exist");
  //     }
  //     const messageStored = await messageModel.findById(messageId);
  //     if (!messageStored) {
  //       throw new BadRequestError("Message is not exist");
  //     }
  //     conversationModel.lastMessage = messageId;
  //     return await conversationModel.save();
  //   }
}
module.exports = ConversationService;
