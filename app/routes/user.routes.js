module.exports = (app) => {
    // controller - methods for handling CRUD ops
    const users = require('../controllers/user.controller');

    // POST - create new note
    app.post('users', users.create);

    // GET - get all notes
    app.get('users', users.findAll);

    // GET - get single object
    app.get('users/:userId', users.findOne);

    // PUT - updates single object
    app.put('users/:userId', users.update);

    // DELETE - deletes single object
    app.delete('users/:userId', users.delete);
}