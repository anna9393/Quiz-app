const quiz = document.querySelector('.main-game');

let score = 0;
const showScore = document.querySelector('.score');
showScore.textContent = `SCORE: ${score}`;

function updateScore() {
    score++;
    showScore.textContent = `SCORE: ${score}`;
}

function createGame(dataFromDB) {

    const question = document.createElement("h3");
    question.setAttribute("class", "question");
    question.textContent = dataFromDB.question;
    quiz.appendChild(question);

    for (let answer of dataFromDB.answers) {
        const optionBtn = document.createElement('button');
        optionBtn.classList.add('option-button');
        optionBtn.textContent = answer.answer;
        quiz.appendChild(optionBtn);

        optionBtn.addEventListener("click", () => {
            optionBtn.classList.add('selected');

            // buttons disabled
            document.querySelectorAll('button').forEach((button) => {
                button.setAttribute('disabled', 'true');
            });

            setTimeout(() => {
                if (answer.is_correct === 1) {
                    updateScore();
                    optionBtn.classList.remove("selected");
                    optionBtn.classList.add("correct");
                } else {
                    optionBtn.classList.remove("selected");
                    optionBtn.classList.add("wrong");
                }
            }, 1000);

            setTimeout(() => {
                quiz.innerHTML = "";
                loadQuestions();
            }, 4000);
        });
    }
}

function loadQuestions() {
    fetch("/api/game")
        .then((res) => res.json()) //convert data from DB to JSON
        .then((json) => {
            createGame(json);
        })
        .catch((err) => console.log(err));
}

document.addEventListener('DOMContentLoaded', function () {
    loadQuestions();
});
