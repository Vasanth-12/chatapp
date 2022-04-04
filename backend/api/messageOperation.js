const router = require('express').Router();
const messageOperation = require('../utils/messageOperation');

/*
    Get message requires
        Parameter:
            ConversationID
*/

router.get('/:conversationID', async (req, res) => {
    console.log("req.params.conversationID: ", req.params.conversationID);
    const getMessage = await messageOperation.getMessage(req.params.conversationID);
    res.send(getMessage);
    
});

/*
    Post message/send message requires 
        Body:
            Message
            conversationMappingID/recipient
            SenderID
*/
router.post('/', async (req, res) => {
    const messageInsertion = await messageOperation.insertMessage(req);
    res.send(messageInsertion);
});

/*
    Delete message requires
        Body:
            conversationMappingID
            MessageQueueID
            User who wants to delete
*/
router.delete('/delete', async (req, res) => {
    const deleteMessageResult = await messageOperation.deleteMessage(req);
    res.send(deleteMessageResult);

});

/*
    Update/Edit message requires
        Body:
            conversationMappingID
            MessageQueueID
            User who wants to delete
            Message/Text
*/
router.put('/edit', async (req, res) => {
    const updateMessageResult = await messageOperation.editMessage(req);
    res.send(updateMessageResult);

});

module.exports = router;