const path = require('path');
const conn = require('../services/connect-dtb');

const apiController = {};

function randomNumber(noOfIds) {
    return Math.floor(Math.random() * noOfIds) + 1;
}

apiController.game = (req, res) => {
    conn.query(
        `SELECT id FROM questions`, (error, result) => {
            if (error) {
                res.status(500).send(error);
            } else {
                let randomID = randomNumber(result.length);
                const queryAll = conn.query(
                    `SELECT * FROM answers 
                    INNER JOIN questions 
                    ON answers.question_id = questions.id 
                    WHERE questions.id = ?`,
                    [randomNumber(randomID)],
                    (error, result) => {
                        if (error) {
                            res.status(500).send(error);
                        } else {
                            res.send({
                                result
                            })
                        }
                    }
                )
            }
        }
    )
}
module.exports = apiController;