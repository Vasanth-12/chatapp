const messageQueue = require('../model/messageQueue');

const insertMessage = async (newMessageRow) => {
    const insertNewMessage = new messageQueue(newMessageRow);
    var result;
    // Maybe need to think of returning insertMessage.save() directly
    await insertNewMessage.save().then(async (insertedRowData) => {
        console.log("Inserted Row Data: ", insertedRowData);
        result = await insertedRowData;
    }).catch(async (err) => {
        console.log("Error while Inserting: ", err);
        result = await err;
    });

    return result;

};

const editMessage = async (updatemessagerow) => {

    var filter = {
        _id: updatemessagerow.body.messageID,
        ConversationID: updatemessagerow.body.conversationID
    };
    var editBlock = {
        $set: {
            Message: updatemessagerow.body.message,
            LastModified: new Date()
        }
    };
    var result;
    await messageQueue.findOneAndUpdate(filter, editBlock).then(async (updatedMessage) => {
        result = await updatedMessage;
    }).catch(async (err) => {
        result = await err;
    });
    return result;
    //return messageQueue.findOneAndUpdate(filter, editBlock);

};

const deleteMessage = async (deletemessagerow) => {

    var filter = {
        _id: deletemessagerow.body.messageID,
        ConversationID: deletemessagerow.body.conversationID
    };
    var deleteBlock = {
        $set: {
            Deleted: new Date(),
            Deletedby: deletemessagerow.body.user
        }
    };
    var result;
    await messageQueue.findOneAndUpdate(filter, deleteBlock).then(async (isDeleted) => {
        result = await isDeleted;
    }).catch(async (err) => {
        result = await err;
    });
    return result;

    //return messageQueue.findOneAndUpdate(filter, deleteBlock);
};

const getMessage = (conversationID) => {
    return messageQueue.find({ConversationID: conversationID})
}


module.exports = {
    insertMessage,
    editMessage,
    deleteMessage,
    getMessage
};