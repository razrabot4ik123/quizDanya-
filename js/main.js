const quiz = document.querySelector(".quiz");
const warning = document.querySelector(".warning");
const btnNext = document.querySelector(".quiz__next-btn");
let count = 0;
let userScore = 0;

if (typeof questions !== "undefined" && questions.length > 0) {
  quiz.classList.remove("hidden");
  showQuestions(count);
} else {
  warning.classList.remove("hidden");
}

btnNext.addEventListener("click", nextQuestion);

function showQuestions(i) {
  const title = document.querySelector(".quiz__title");
  const list = document.querySelector(".quiz__list");
  const total = document.querySelector(".quiz__total");

  title.innerHTML = `${questions[i].question}`;
  list.innerHTML = "";
  questions[i].options.forEach((i) => {
    const text = `<li class="quiz__option">${i}</li>`;
    list.insertAdjacentHTML("beforeend", text);
  });

  const options = list.querySelectorAll(".quiz__option");
  options.forEach((i) => i.setAttribute("onclick", "optionSelected(this)"));

  total.innerHTML = `${i + 1} из ${questions.length}`;
}

function optionSelected(a) {
  const userAnswer = a.textContent;
  const correctAnswer = questions[count].answer;
  const options = document.querySelectorAll(".quiz__option");

  if (userAnswer == correctAnswer) {
    userScore += 1;
    a.classList.add("correct");
  } else {
    a.classList.add("incorrect");

    options.forEach((i) => {
      if (i.textContent == correctAnswer) {
        setTimeout(() => {
          i.classList.add("correct");
        }, 100);
      }
    });
  }

  options.forEach((i) => i.classList.add("disabled"));
}

function nextQuestion() {
  const option = document.querySelector(".quiz__option");
  const result = document.querySelector(".result");
  const resultText = document.querySelector(".result__text");

  if (count + 1 == questions.length && option.classList.contains("disabled")) {
    result.classList.remove("hidden");
    quiz.classList.add("hidden");
    if (userScore === 15) {
      resultText.innerHTML = `Вы и есть Даня, потому что ваш результат: ${userScore}`;
    } else if (userScore === 0) {
      resultText.innerHTML = `Вы не знаете Даню, ваш результат: ${userScore}. Живо узнавайте о нем`;
    } else {
      resultText.innerHTML = `Вы знаете js на уровне Дани на столько: ${userScore}`;
    }
    return;
  }

  if (option.classList.contains("disabled")) {
    count++;
    showQuestions(count);
  } else {
    alert("Ответь сначало");
  }
}

document
  .querySelector(".reload-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    location.reload();
  });
