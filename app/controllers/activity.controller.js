const Activity = require('../models/activity.model');
const User = require('../models/user.model');

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
        segments: req.body.segments,
        author: req.body.user
    });
    
    User.findById(req.body.user, (err, user) => {
        if (err) throw new Error(err);

        user.activity.push(activity);

        user.save((err) => {
            
        })
    })

    // save what created to db
    activity.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "smth went wrong on creating activity"
        });
    });
};

// Retrieve whole collection from db
exports.findAll = (req, res) => {
    Activity.find()
    .populate('user')
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
            message: "Error with get activity id: " + req.params.actId

        });
    });
};

// Update single object
exports.update = (req, res) => {
    Activity.findByIdAndUpdate(req.params.actId, 
        req.body,
        {new: true}) // zwracazmodyfikowany dokument do then()
    .then(activity => {
        if(!activity) {
            return res.status(404).send({
                message: "user" + req.params.actId
            });
        }
        res.send(activity);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user" + req.params.actId
            });
        }
        return res.status(500).send({
            message: "Error with update activity id: " + req.params.actId
        });
    });
};

// Delete single object
exports.delete = (req, res) => {
    Activity.findByIdAndRemove(req.params.actId)
    .then(activity => {
        if(!activity) {
            return res.status(404).send({
                message: "user" + req.params.actId
            });
        }
        res.send({message: "Activity deleted!"});
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user" + req.params.actId
            });
        }
        return res.status(500).send({
            message: "Error with delete activity id: " + req.params.actId
        });
    })
};
