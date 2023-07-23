const express = require('express');
const passport = require('passport');
const upload = require('../middleware/upload');
const controller = require('../controllers/category');
const routes = express.Router();


routes.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
routes.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById);
routes.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove);
routes.post('/', passport.authenticate('jwt', { session: false }), upload.single('image'), controller.create);
routes.patch('/:id', passport.authenticate('jwt', { session: false }), upload.single('image'), controller.update);

module.exports = routes;
