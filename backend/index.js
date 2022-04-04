const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config.json');
const transaction = require('./api/conversationMappingOperation');
const message = require('./api/messageOperation');

//const port = 3000;

app.get('/', (req, res) => {
    console.log('Hello World');
    res.send('Hi 3000');
});

// Connect to mongoDB
const run = async () => {
    const mongoURI = config.mongoURI;
    await mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
		.then(() => {
			console.log("Connected to MongoDB.");
		})
		.catch((err) => console.log(err));
};

app.use(express.json());
app.use('/message', message);
app.use('/conversation', transaction);

app.listen(config.port, () => {
    console.log(`Server is running at port ${config.port}`);
    run();
});

