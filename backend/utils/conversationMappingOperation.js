const mongoose = require('mongoose')
const conversationMappingOperation = require('../schema/dataAccess/conversationMappingOperation');

const blockConversation = async (req, res) => {
    var responseValue;

    var blockedResult = await conversationMappingOperation.blockConversation(req);
    if (blockedResult) {
        if (blockedResult._id) {
            responseValue = {"status": 200, "message": "Blocked Conversation"};
        }
        else {
            responseValue = {status: 500, message: "Internal Error"}
        }
    }
    else {
        responseValue = {status: 400};
    }
    return responseValue;
};

module.exports = {
    blockConversation,
};