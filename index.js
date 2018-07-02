const express = require('express');
const bodyParser = require('body-parser');

// express app
const app = express();

// parser requests
app.use(bodyParser.urlencoded({ extended: true}))

// parser application/json
app.use(bodyParser.json())

require('./mongo')(app);


// root route
app.get('/', (req, res) => {
    res.json({"message": "Hello World"});
});

require('./app/routes/user.routes')(app);
require('./app/routes/activity.routes')(app);


app.listen(3000, () => {
    console.log("Started server on localhost:3000");
});