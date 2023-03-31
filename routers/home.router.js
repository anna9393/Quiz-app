const express = require('express');
const homeControler = require('../controllers/home.controller');

homeRouter = express.Router();

homeRouter.get('/game', homeControler.game);
homeRouter.get('/questions', homeControler.questions);

module.exports = homeRouter;