const mongoose = require('mongoose');

const conversationMappingSchema = new mongoose.Schema({
    OriginatorID: {
        type: String,
        required: true,
    },
    MemberID: {
        type: [String]
    },
    Created: {
        type: Date
    },
    IsGroup: {
        type: Boolean
    },
    Blocked: {
        type: String
    },

},{
    collection: "ConversationMapping"
});

module.exports = mongoose.model('conversationMapping', conversationMappingSchema);