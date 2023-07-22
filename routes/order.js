const express = require('express');
const controller = require('../controllers/order');
const routes = express.Router();


routes.get('/', controller.getAll);
routes.post('/', controller.create);

module.exports = routes;
