const express = require('express');
const passport = require('passport');
const controller = require('../controllers/category');
const routes = express.Router();


routes.get('/',passport.authenticate('jwt', { session: false }), controller.getAll);
routes.get('/:id', controller.getById);
routes.delete('/:id', controller.remove);
routes.post('/', controller.create);
routes.patch('/:id', controller.update);

module.exports = routes;
