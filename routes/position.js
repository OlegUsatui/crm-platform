const express = require('express');
const controller = require('../controllers/position');
const passport = require("passport");
const routes = express.Router();


routes.get('/:categoryId', passport.authenticate('jwt', { session: false }), controller.getByCategoryId);
routes.post('/',passport.authenticate('jwt', { session: false }), controller.create);
routes.patch('/:id', passport.authenticate('jwt', { session: false }), controller.update);
routes.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove);

module.exports = routes;
