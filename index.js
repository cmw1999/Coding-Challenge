const app = require('express')();
const mongoose = require('mongoose'); //mongoose > mongoDB server > WiredTiger Storage Engine > File
const bodyparser = require('body-parser');
const PORT = process.env.PORT || 8080; // not used on heroku

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`); //logging port
});

require('dotenv/config');

// import requests handler
const handler = require('./routes/handler');

app.use(bodyparser.json());

// requests sent here
app.use('/', handler);

// connect to the database
const url = process.env.DB_CON; 
const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })
