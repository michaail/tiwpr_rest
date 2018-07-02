const Activity = require('../models/activity.model');


// Creates new Activity
exports.create = (req, res) => {
    if (!req.body.length) {
        return res.status(400).send({
            message: "Activity can't be posted without length"
        });
    }

    // Create object
    const activity = new Activity({
        title: req.body.title || "Activity",
        length: req.body.length,
        duration: req.body.duration || "0:00:00",
        segments: req.body.segments
    });
    
    // save what created to db
    activity.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "smth went wrong on creating Note"
        });
    });
};

// Retrieve whole collection from db
exports.findAll = (req, res) => {
    Activity.find()
    .then(activities => {
        res.send(activities);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "smth went wrong on retrieving activities"
        })
    })
};

// Retrieve single object from db
exports.findOne = (req, res) => {
    Activity.findById(req.params.actId)
    .then(activity => {
        if (!activity) {
            return res.status(404).send({
                message: "Activity with id: " + req.params.actId + " not found"
            });
        }
        res.send(activity);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Activity with id: " + req.params.actId + " not found"
            });
        }
        return res.status(500).send({
            message: "Error with activity id: " + req.params.actId

        });
    });
};

// Update single object
exports.update = (req, res) => {

};

// Delete single object
exports.delete = (req, res) => {

};
