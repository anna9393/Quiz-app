const question = document.querySelector('.question');
const button = document.querySelectorAll('button');
const btnA = document.querySelector('.a');
const btnB = document.querySelector('.b');
const btnC = document.querySelector('.c');
const btnD = document.querySelector('.d');

let score = 0;
const showScore = document.querySelector('.score');

function myFetcher() {
    fetch('/api/game', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json();
        })
        .then((Object) => {
            const arrayOfQuestions = Object.result
            console.log(arrayOfQuestions);

            question.textContent = arrayOfQuestions[0].question;
            btnA.textContent = arrayOfQuestions[0].answer;
            if (arrayOfQuestions[0].is_correct === 1) {
                btnA.addEventListener('click', () => {
                    btnA.classList.add("green");
                    score++;
                    showScore.textContent = `SCORE: ${score}`;
                    setTimeout(myFetcher, 2000);
                })
            } else {
                btnA.addEventListener('click', () => {
                    btnA.classList.add("red")
                    setTimeout(myFetcher, 2000);
                })
            }
            btnB.textContent = arrayOfQuestions[1].answer;
            if (arrayOfQuestions[1].is_correct === 1) {
                btnB.addEventListener('click', () => {
                    btnB.classList.add("green")
                    score++;
                    showScore.textContent = `SCORE: ${score}`;
                    setTimeout(myFetcher, 2000);
                })
            } else {
                btnB.addEventListener('click', () => {
                    btnB.classList.add("red")
                    setTimeout(myFetcher, 2000);
                })
            }
            btnC.textContent = arrayOfQuestions[2].answer;
            if (arrayOfQuestions[2].is_correct === 1) {
                btnC.addEventListener('click', () => {
                    btnC.classList.add("green")
                    score++;
                    showScore.textContent = `SCORE: ${score}`;
                    setTimeout(myFetcher, 2000);
                })
            } else {
                btnC.addEventListener('click', () => {
                    btnC.classList.add("red")
                    setTimeout(myFetcher, 2000);
                })
            }
            btnD.textContent = arrayOfQuestions[3].answer;
            if (arrayOfQuestions[3].is_correct === 1) {
                btnD.addEventListener('click', () => {
                    btnD.classList.add("green")
                    score++;
                    showScore.textContent = `SCORE: ${score}`;
                    setTimeout(myFetcher, 2000);
                })
            } else {
                btnD.addEventListener('click', () => {
                    btnD.classList.add("red")
                    setTimeout(myFetcher, 2000);
                })
            }
        })
        .catch((error) => {
            console.log('There has been a problem with your fetch operation:', error);
        })
}

myFetcher();
