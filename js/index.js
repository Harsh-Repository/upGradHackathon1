// Import the data object from the data.js file
import data from "./dataset.json";
// console.log(data);

const jsonData = data;

const musicQuestions = jsonData.music.filter((question) => {
  return question.category === "music";
});

const modernArtQuestions = jsonData.modernArt.filter((question) => {
  return question.category === "modern-art";
});

const codingQuestions = jsonData.coding.filter((question) => {
  return question.category === "coding";
});

// console.log(modernArtQuestions);

document.getElementById("musicBtn").addEventListener("click", function () {
  displayQuestions(musicQuestions);
});

document.getElementById("artBtn").addEventListener("click", function () {
  displayQuestions(modernArtQuestions);
});

document.getElementById("codingBtn").addEventListener("click", function () {
  displayQuestions(codingQuestions);
});

function displayQuestions(questions) {
  let index = 0;
  let score = 0;

  function showQuestion() {
    let question = questions[index];

    let questionElement = document.createElement("div");
    questionElement.innerHTML = `<h2>Question ${index + 1}</h2><p>${
      question.question
    }</p>
    <p><input type="radio" name="option" value="${question.options[0]}"/> ${
      question.options[0]
    }</p>
    <p><input type="radio" name="option" value="${question.options[1]}"/> ${
      question.options[1]
    }</p>
    <p><input type="radio" name="option" value="${question.options[2]}"/> ${
      question.options[2]
    }</p>
    <p><input type="radio" name="option" value="${question.options[3]}"/> ${
      question.options[3]
    }</p>
    `;
    document.getElementById("main").innerHTML = "";
    document.getElementById("main").appendChild(questionElement);

    let backButton = document.createElement("button");
    backButton.innerHTML = "Back";
    backButton.addEventListener("click", previousQuestion);
    document.getElementById("main").appendChild(backButton);

    let nextButton = document.createElement("button");
    nextButton.innerHTML = "Next";
    nextButton.addEventListener("click", nextQuestion);
    document.getElementById("main").appendChild(nextButton);
  }

  function nextQuestion() {
    let selectedOption = document.querySelector("input[name='option']:checked");

    if (selectedOption) {
      let selectedAnswer = selectedOption.value;
      let question = questions[index];

      if (selectedAnswer === question.answer) {
        score++;
      }

      index++;

      if (index < questions.length) {
        showQuestion();
      } else {
        showScore();
      }
    }
  }

  function previousQuestion() {
    index--;
    if (index >= 0) {
      showQuestion();
    }
  }

  function showScore() {
    document.getElementById("main").innerHTML = `<h2>Quiz Completed!</h2>
    <p>Your score is: ${score}/${questions.length}</p>`;

    let backButton = document.createElement("button");
    backButton.innerHTML = "Go Back";
    backButton.addEventListener("click", () => {
      location.reload();
    });
    document.getElementById("main").append(backButton);
  }
  showQuestion();
}
