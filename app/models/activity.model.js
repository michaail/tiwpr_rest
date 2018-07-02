const mongose = require('mongoose');

const ActivitySchema = mongose.Schema({
    title: String,
    length: String,
    duration: String,
    segments: String,
    user: mongose.Schema.ObjectId
}, {
    timestamps: true
});

module.exports = mongose.model('Activity', ActivitySchema);