const listedQuestions = document.querySelector(".listed-questions");
const form = document.querySelector(".questions-form");

const submitBtn = document.querySelector(".submit-btn");

function renderQuestions(resultFromAPI) {
  for (let i = 0; i < resultFromAPI.length; i++) {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question-div');

    const textLine = document.createElement('div');
    textLine.classList.add('text-line');

    const question = document.createElement('div');
    question.classList.add('question');
    question.textContent = resultFromAPI[i].question;

    const line = document.createElement('hr');

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'delete';

    textLine.appendChild(question);
    textLine.appendChild(deleteBtn);
    questionDiv.appendChild(textLine);
    questionDiv.appendChild(line);

    listedQuestions.appendChild(questionDiv);

    deleteBtn.addEventListener("click", () => {
      fetch(`/api/questions/${resultFromAPI[i].id}`, {
        method: "DELETE",
      }).then((response) => {
        if (response.ok) {
          questionDiv.removeChild(textLine);
          questionDiv.removeChild(line);
        }
      });
    });
  }
}

function listQuestions() {
  fetch("/api/questions")//method GET
    .then((res) => res.json()) //promise

    .then((json) => {
      console.log(json)
      renderQuestions(json);
    })
    .catch((err) => console.log(err));
}

function postQuestion() {
  const question = document.querySelector(".question-input").value;
  const radios = document.querySelectorAll(".radio-input");
  const answersFromInput = document.querySelectorAll(".answer");//array

  const answers = [];
  for (let i = 0; i < answersFromInput.length; i++) {
    if (answersFromInput[i].value === "" && radios[i].checked) {
      alert(
        "Right option cannot be empty!"
      );
    }

    if (answersFromInput[i].value !== "") {
      answers.push(answersFromInput[i]);
    }
  }

  const radioInputs = []; //0,1,0,0
  for (let i = 0; i < answers.length; i++) {
    if (radios[i].checked) {
      radioInputs.push("1");
    }
    radioInputs.push("0");
  }

  const fetchingAnswers = [];
  for (let i = 0; i < answers.length; i++) {
    fetchingAnswers.push({
      answer: answers[i].value,
      is_correct: radioInputs[i],
    });
  }

  fetch("/api/questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question: `${question}`, answers: fetchingAnswers }),
    redirect: "manual",
  })
    .then((response) => {
      if (response.ok) {
        console.log("Question and answers inserted to database!");
      }
    })
    .catch((err) => console.log(err));
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  postQuestion();
  form.reset();
  listQuestions();
});

listQuestions();
