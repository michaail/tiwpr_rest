const mongose = require('mongoose');
const mongoPagination = require('mongo-cursor-pagination');

const UserSchema = mongose.Schema({
    //_id: mongose.Schema.Types.ObjectId,
    name: String,
    email: String,
    bike: String,
    segments: [{
        type: mongose.Schema.Types.ObjectId,
        ref: "Segment"
    }],
    activity: [{
        type: mongose.Schema.Types.ObjectId,
        ref: "Activity"
    }]
}, {
    timestamps: true
});

UserSchema.plugin(mongoPagination.mongoosePlugin);

module.exports = mongose.model('User', UserSchema);