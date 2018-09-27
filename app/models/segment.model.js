const mongose = require('mongoose');
const mongoPagination = require('mongo-cursor-pagination');

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

SegmentSchema.plugin(mongoPagination.mongoosePlugin);

module.exports = mongose.model('Segment', SegmentSchema);