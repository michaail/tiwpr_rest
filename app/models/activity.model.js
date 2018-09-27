const mongose = require('mongoose');
const mongoPagination = require('mongo-cursor-pagination');

const ActivitySchema = mongose.Schema({
    title: String,
    length: String,
    duration: String,
    segments: [{
        type: mongose.Schema.Types.ObjectId,
        ref: 'Segment'
    }],
    author: 
        {
            type: mongose.Schema.Types.ObjectId,
            ref: 'User'
        }
    
}, {
    timestamps: true
});

ActivitySchema.plugin(mongoPagination.mongoosePlugin);

module.exports = mongose.model('Activity', ActivitySchema);
