const express = require('express');
const controller = require('../controllers/auth');
const routes = express.Router();


routes.post('/login', controller.login)
routes.post('/register', controller.register)

module.exports = routes;
