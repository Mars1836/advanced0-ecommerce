const producerInstance = require("../../producer");
const notificationModel = require("../models/notification.model");

class NotificationService {
  static async createByShop({
    content,
    title,
    recipientIds,
    recipientType = "user",
    senderId,
  }) {
    const newNoti = await notificationModel.create({
      title,
      content,
      recipientIds,
      recipientType,
      senderType: "shop",
      senderId,
    });
    if (newNoti) {
      await producerInstance.publicMessage(newNoti);
    }
    return newNoti;
  }
  static async push({ type, receivedId = 1, senderId = 1, options = {} }) {
    let content;
    switch (type) {
      case "PRODUCT-001":
        content = "Shop @@ đã thêm một sản phẩm mới";
      case "PROMOTION-001":
        content = "SHOP @@ đã thêm một voucher mới";
    }
    const newNoti = await notificationModel.create({
      type,
      content,
      senderId,
      receivedId,
      options,
    });
    return newNoti;
  }
  static async getAll() {
    const a = await notificationModel
      .find()
      .select({
        recipientIds: 0,
        recipientType: 0,
        updatedAt: 0,
        __v: 0,
      })
      .sort({ createdAt: -1 });
    return a;
  }
  static async getByUser({ userId, type = "ALL", isRead = 0 }) {
    const match = {
      receivedId: +userId,
    };
    if (type !== "ALL") {
      match.type = type;
    }
    return await notificationModel.aggregate([
      { $match: match },
      {
        $project: {
          type: 1,
          senderId: 1,
          options: 1,
          createdAt: 1,
          receivedId: 1,
          content: 1,
        },
      },
    ]);
  }
  static async testRb() {
    return await producerInstance.publicMessage({ a: "hellow" });
  }
}
module.exports = NotificationService;
