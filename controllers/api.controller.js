const { error } = require('console');
const path = require('path');
const conn = require('../services/connect-dtb');

const apiController = {};

apiController.game = (req, res) => {

    conn.query(
        `SELECT * FROM questions`,
        (error, sumQuestions) => {
            if (error) {
                res.status(500).send(error);
                return;
            }

            let randomQuestion = randomNumber(sumQuestions.length);

            conn.query(
                `SELECT * FROM questions WHERE id=?`,
                [randomQuestion],
                (error, question) => {
                    if (error) {
                        res.status(500).send(error);
                        return;
                    }

                    conn.query(
                        `SELECT * FROM answers WHERE question_id = ?;`,
                        [randomQuestion],
                        (error, answers) => {
                            if (error) {
                                res.status(500).send(error);
                                return;
                            }

                            let result = { id: question[0].id, question: question[0].question, answers: answers }

                            res.status(200).json(result);
                        });
                });
        });
}

apiController.listQuestions = (req, res) => {
    conn.query(`SELECT * FROM questions;`, (error, allQuestions) => {
        if (error) {
            res.status(500).send(error);
        }
        res.status(200).json(allQuestions);
    })
}

apiController.postQuestion = (req, res) => {
    const question = req.body.question;
    const answers = req.body.answers;

    conn.query(
        `INSERT INTO questions (question) VALUES (?)`,
        [question],
        (error, resultQuestion) => {
            if (error) {
                console.log(resultQuestion.insertId);
                res.status(500).send(error);
                return;
            }

            for (let i = 0; i < answers.length; i++) {
                conn.query(
                    `INSERT INTO answers (question_id, answer, is_correct) VALUES (?,?,?);`,
                    [resultQuestion.insertId, answers[i].answer, answers[i].is_correct],
                    (error, resultQuestion) => {
                        if (error) {
                            res.status(500).send(error);
                            return;
                        }
                    })
            }
            res.status(200).send("Question added succesfully!");
        })
}

apiController.deleteQuestion = (req, res) => {
    const id = req.params.id;

    conn.query(
        `DELETE FROM questions WHERE id = ?;`,
        [id],
        (error, deletedQuestion) => {
            if (error) {
                res.status(500).send(error);
                return;
            }
            if (deletedQuestion.affectedRows === 0) {
                res.status(400).send('Question not found!');
                return;
            }

            conn.query(
                `SELECT * FROM answers WHERE question_id = ?`,
                [id],
                (error, deletedAnswers) => {
                    if (error) {
                        res.status(500).send(error);
                        return;
                    }

                    for (let i = 0; i < deletedAnswers.length; i++) {
                        conn.query(
                            `DELETE FROM answers WHERE id = ?;`,
                            [deletedAnswers[i].id],
                            (error, result) => {
                                if (error) {
                                    res.status(500).send(error);
                                    return;
                                }
                            })
                    }
                    res.status(200).send("Question deleted succesfully!");
                })
        })
}

function randomNumber(noOfQuestions) {
    return Math.floor(Math.random() * noOfQuestions) + 1;
}

module.exports = apiController;
