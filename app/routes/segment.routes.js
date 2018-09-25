module.exports = (app) => {
    // controller - methods for handling CRUD ops
    const segments = require('../controllers/segment.controller');

    // POST - create new object
    app.post('/segments', segments.create);

    // GET - get all objects
    app.get('/segments', segments.findAll);

    // GET - get single object
    app.get('/segments/:segId', segments.findOne);

    // PUT - updates single object
    app.put('/segments/:segId', segments.update);

    // DELETE - deletes single object
    app.delete('/segments/:segId', segments.delete);

    // /segments/<id>/users - GET
    // GET - get all objects for segment
    app.get('/segments/:segId/users', segments.findAllSegmentUsers);

    app.get('/segments/:segId/activities', segments.findAllActivitiesWithSegment);
}