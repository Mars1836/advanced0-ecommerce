const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Notifications";
const DOCUMENT_NAME = "notification";
// Declare the Schema of the Mongo model
var notificationModel = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "SHOP-001",
        "PRODUCT-001",
        "PROMOTION-001",
        "ORDER-001",
        "ORDER-002",
      ],
      default: "SHOP-001",
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    recipientIds: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
    },
    recipientType: {
      type: String,
      enum: ["user", "shop"],
    },
    senderType: {
      type: String,
      enum: ["user", "shop"],
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
      required: true,
    },
    options: {
      type: Object,
      default: {},
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, notificationModel);
