const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = "Messages";
const DOCUMENT_NAME = "message";

var messageSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["text", "image"],
      default: "text",
    },
    conversation_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);
//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, messageSchema);
