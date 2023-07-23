const express = require('express');
const controller = require('../controllers/analytics');
const passport = require("passport");
const routes = express.Router();


routes.get('/overview', passport.authenticate('jwt', { session: false }), controller.overview)
routes.get('/analytics', passport.authenticate('jwt', { session: false }), controller.analytics)

module.exports = routes;
