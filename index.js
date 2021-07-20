const app = require('express')();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

require('dotenv/config');
// imports
const handler = require('./routes/handler');

app.use(bodyparser.json());

app.get(
    PORT,
    () => console.log(`We are live on http://localhost:${PORT}`)
)

// posts
app.use('/', handler);

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

