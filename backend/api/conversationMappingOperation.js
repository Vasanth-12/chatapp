const router = require('express').Router();
const conversationMappingOperation = require('../utils/conversationMappingOperation');

/* 
    Block user requires
        Parameter:
            conversationMappingID
            UserID who going to block
*/
router.put('/block', async (req, res) => {
    const blockOpr = await conversationMappingOperation.blockConversation(req); 
    console.log("Result: ", blockOpr); 
    res.send(blockOpr);
});

module.exports = router;