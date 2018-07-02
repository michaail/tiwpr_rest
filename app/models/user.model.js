const mongose = require('mongoose');

const UserSchema = mongose.Schema({
    name: String,
    email: String,
    bike: String,
    segments: String
}, {
    timestamps: true
});

module.exports = mongose.model('User', UserSchema);