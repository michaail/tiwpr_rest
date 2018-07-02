// get db configuration
const dbConfig = require('./config/db.config');
const mongose = require('mongoose');

mongose.Promise = global.Promise;

module.exports = function (app) {
    mongose.connect(dbConfig.url)
    .then(() => {
        console.log("Successfully connected to db");
    }).catch(err => {
        console.log("Couldn't connect to db");
        process.exit();
    });
}