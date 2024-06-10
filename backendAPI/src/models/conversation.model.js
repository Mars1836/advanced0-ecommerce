const mongoose = require("mongoose"); // Erase if already required
const COLLECTION_NAME = "Conversations";
const DOCUMENT_NAME = "conversation";
// Declare the Schema of the Mongo model
var conversationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    participants: {
      type: [mongoose.Schema.Types.ObjectId],
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
    isDedeted: {
      type: Boolean,
      default: false,
    },
    lastMessage: {
      type: String,
      default: "",
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, conversationSchema);
