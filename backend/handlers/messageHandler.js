const messageOperation = require('../schema/dataAccess/messageOperation');
const conversationMappingOperation = require('../schema/dataAccess/conversationMappingOperation');



/*
getMessage:
    Get all the message for the given conversationID

Return:
    A new promise which is chained to the resolve of the promise from DB Access

Exception:
    Throws exception when there is any reject in promise returned from DB Access
*/
const getMessage = (conversationID) => {
    returnPromise = messageOperation.getMessage(conversationID)
    .then((result) => {
        console.log('Successfully fetched message data from mongodb');
        return {'chat_message_list': result};
    })
    .catch((err) => {
        console.log('Error occurred while fetching message for a given conversationID:' + conversationID);
        throw err;
    })
    return new Promise(resolve => resolve(returnPromise))
};


/*
insertMessage
    Message/Conversation between the user

Return:
    json value for http response.
*/
const insertMessage = async (req) => {
    // Need to think more
    console.log(req.body);

    var conversationID = req.body.conversationID;
    var orginatorID = req.body.orginatorID;
    console.log(orginatorID);
    var messageInsertion;

    var newMessageRow = {
        "ConversationID": conversationID,
        "OrginatorID": orginatorID,
        "Message": req.body.message,
        "Created": new Date()
    };

    if (conversationID) {
        var x = await _insertMessage(newMessageRow);
        messageInsertion = await _getResponse(x);
    }
    else {
        var memberID = req.body.memberID;
        memberID.push(orginatorID);
        var newMessageTransactionRow = {
            "OriginatorID": orginatorID,
            "MemberID": memberID,
            "blocked": null
        };

        await conversationMappingOperation.newMessageTransaction(newMessageTransactionRow).then(async (newConversation) => {
            console.log("Transaction Added");
            newMessageRow.ConversationID = newConversation._id;
            var x = await _insertMessage(newMessageRow);
            console.log('X: ', x);
            messageInsertion = await _getResponse(x);
        }).catch(async (err) => {
            console.log(`Error: ${err}`);
            messageInsertion = await _getResponse(err);
        });
    }
    console.log(messageInsertion);
    return messageInsertion;
};

/*
_insertMessage:
    Call and return DB function
*/
const _insertMessage = async (newMessageRow) => {
    return messageOperation.insertMessage(newMessageRow);
}

/*
editMessage:
    Edit message when the user want to edit

Return:
    json value for http response.
*/
const editMessage = async (req) => {
    const dbOperation = await messageOperation.editMessage(req);
    console.log('EditMessage: ', dbOperation);
    return await _getResponse(dbOperation);
};

/*
deleteMessage:
    Delete the message when the user wants to delete

Return:
    json value for http response.
*/
const deleteMessage = async (req) => {
    const dbOperation = await messageOperation.deleteMessage(req);
    console.log('DeleteMessage: ', dbOperation);
    return await _getResponse(dbOperation);
};

/*
_getResponse:
    based on the input object, this function will generate 
    response json

Return:
    json value for http response.
*/
const _getResponse = async (result) => {
    if (result) {
        if (result._id) {
            return {
                status: 200,
                message: "success",
                id: result._id
            };
        }
        else {
            return {
                status: 500,
                message: "Interal Error",
                id: result._id
            };
        }
    }
    else {
        //if (result._message = /MessageQueue validation failed/) {
            return {
                status: 400,
                message: "Validation Error",
            };
        //}

    }
}


module.exports = {
    insertMessage,
    editMessage,
    deleteMessage,
    getMessage
};