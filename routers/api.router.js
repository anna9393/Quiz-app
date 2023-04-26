const express = require('express');
const apiController = require('../controllers/api.controller');
const apiRouter = express.Router();

apiRouter.get('/game', apiController.game);
apiRouter.get('/questions', apiController.listQuestions);
apiRouter.post('/questions', apiController.postQuestion);
apiRouter.delete('/questions/:id', apiController.deleteQuestion);

module.exports = apiRouter;
