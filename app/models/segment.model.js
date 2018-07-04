const mongose = require('mongoose');

const UserSchema = mongose.Schema({
    title: String,
    length: String,
    incline: String,
    
}, {
    timestamps: true
});

module.exports = mongose.model('User', UserSchema);