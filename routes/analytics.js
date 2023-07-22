const express = require('express');
const controller = require('../controllers/analytics');
const routes = express.Router();


routes.get('/overview', controller.overview)
routes.get('/analytics', controller.analytics)

module.exports = routes;
