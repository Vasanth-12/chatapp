const mongoose = require("mongoose");
const conversationMapping = require('./conversationMapping');

const messageQueue = new mongoose.Schema({
    ConversationID: {
        type: mongoose.ObjectId,
        required: true
    },
    Message: {
        type: String,
        required: true
    },
    OrginatorID: {
        type: String,
        required: true
    },
    Created: {
        type: Date
    },
    Deleted: {
        type: Date
    },
    Deletedby: {
        type: String
    },
    LastModified: {
        type: Date
    }
}, {
    collection: "MessageQueue"
})

module.exports = mongoose.model('MessageQueue',messageQueue);