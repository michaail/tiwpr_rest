const mongose = require('mongoose');

const ActivitySchema = mongose.Schema({
    title: String,
    length: String,
    duration: String,
    segments: String,
    author: [
        {
            type: mongose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {
    timestamps: true
});

module.exports = mongose.model('Activity', ActivitySchema);
