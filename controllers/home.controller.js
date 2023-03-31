const path = require('path');

const homeControler = {};

homeControler.game = (req, res) => {
    res.sendFile(path.join(req.app.get('views'), 'game.html'));
};

homeControler.questions = (req, res) => {
    res.sendFile(path.join(req.app.get('views'), 'questions.html'));
};

module.exports = homeControler;