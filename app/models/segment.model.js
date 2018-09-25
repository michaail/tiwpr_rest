const mongose = require('mongoose');

const SegmentSchema = mongose.Schema({
    name: String,
    length: String,
    incline: String,
    time: String,
    author: {
        type: mongose.Schema.Types.ObjectId,
        ref: 'User'
    }
    
}, {
    timestamps: true
});

module.exports = mongose.model('Segment', SegmentSchema);