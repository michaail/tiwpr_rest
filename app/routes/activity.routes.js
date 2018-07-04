module.exports = (app) => {
    // controller - methods for handling CRUD ops
    const activities = require('../controllers/activity.controller');

    // POST - create new object
    app.post('/activities', activities.create);

    // GET - get all objects
    app.get('/activities', activities.findAll);

    // GET - get single object
    app.get('/activities/:actId', activities.findOne);

    // PUT - updates single object
    app.put('/activities/:actId', activities.update);

    // DELETE - deletes single object
    app.delete('/activities/:actId', activities.delete);
}