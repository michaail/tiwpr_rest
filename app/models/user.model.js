const mongose = require('mongoose');
const activities = require('mongoose');

const UserSchema = mongose.Schema({
    name: String,
    email: String,
    bike: String,
    segments: String,
    activities: activities
}, {
    timestamps: true
});

module.exports = mongose.model('User', UserSchema);