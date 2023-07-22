const express = require('express');
const controller = require('../controllers/position');
const routes = express.Router();


routes.get('/:categoryId', controller.getByCategoryId);
routes.post('/', controller.create);
routes.patch('/:id', controller.update);
routes.delete('/:id', controller.remove);

module.exports = routes;
