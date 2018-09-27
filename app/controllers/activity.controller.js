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
exports.findAll = async (req, res) => {
    const activityPromise = Activity.paginate({
        limit: req.query.per_page || 3,
        previous: req.query.previous || null,
        next: req.query.next || null
      });
      const countPromise = Activity.count();
      const [activities, count] = await Promise.all([activityPromise, countPromise]);
      
      const links = {};
      if (activities.hasNext) {
        links.next = `${req.protocol}://${req.get('host')}${req.path}?next=${activities.next}`;
      }
      if (activities.hasPrevious) {
        links.previous = `${req.protocol}://${req.get('host')}${req.path}?previous=${activities.next}`;
      }
      res.links(links);
      res.set('total-count', count);
      
      return res.status(200).send(activities.results );

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
