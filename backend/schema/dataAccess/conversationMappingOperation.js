const mongoose = require('mongoose')
const conversationMapping = require('../model/conversationMapping');


/*
newMessageTransaction
    create new conversation for the given member-ids

Return
    Object(json value) of the conversation 
*/
const newMessageTransaction = async (newMessageTransactionRow) => {
    const newtransaction = new conversationMapping(newMessageTransactionRow);

    return newtransaction.save();
};

/*
blockConversation:
    The function will block and unblock conversation

    blockConversation - true => block the conversation
    blockConversation - false => unblock the conversation

Return
    JSON value for http response
*/

const blockConversation = async (transactionBlocker) => {
    // 1. Need to change UnBlock based on the user who Blocks the conversation
    // 2. Blocked value should be array

    var filter, options, updateBlock;

    filter = {
        _id: transactionBlocker.body.conversationID
    };
    // Block conversation
    if (transactionBlocker.body.blockConversation) {
        options = { Blocked: true };
        updateBlock = {
            $set: {
                Blocked: transactionBlocker.body.userID
            }
        };
    }
    // UnBlock conversation
    else {
        options = { Blocked: false };
        updateBlock = {
            $set: {
                Blocked: null
            }
        };
    }

    await conversationMapping.findOneAndUpdate(filter, updateBlock, options).then(async (conversationBlocking) => {
        result = await conversationBlocking;
    }).catch(async (err) => {
        result = await err
    });
    return result;
    //return conversationMapping.updateOne(filter, updateBlock, options);
};

module.exports = {
    newMessageTransaction,
    blockConversation,
};