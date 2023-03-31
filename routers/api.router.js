const express = require('express');
const apiController = require('../controllers/api.controller');
const apiRouter = express.Router();

apiRouter.get('/game', apiController.game);

module.exports = apiRouter;