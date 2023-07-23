const express = require('express');
const controller = require('../controllers/order');
const passport = require("passport");
const routes = express.Router();


routes.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
routes.post('/', passport.authenticate('jwt', { session: false }), controller.create);

module.exports = routes;
