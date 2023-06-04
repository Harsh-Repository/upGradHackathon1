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
  // document.getElementById("musicBtn").disabled = true;
});

document.getElementById("artBtn").addEventListener("click", function () {
  displayQuestions(modernArtQuestions);
  // document.getElementById("artBtn").disabled = true;
});

document.getElementById("codingBtn").addEventListener("click", function () {
  displayQuestions(codingQuestions);
  // document.getElementById("codingBtn").disabled = true;
});

function displayQuestions(questions) {
  let index = 0;
  let score = 0;
  let selectedAnswer = 0;
  function showQuestion() {
    let question = questions[index];

    let questionElement = document.createElement("div");
    questionElement.innerHTML = `
    <div class="quiz-container"><h2 class="quiz-header">Question ${
      index + 1
    }</h2><p id="question">${question.question}</p>
    <ul>
      <li>
        <input type="radio" name="option" class="radiogroup" style="cursor: pointer" id="${
          question.options[0]
        }" value="${question.options[0]}"/> ${question.options[0]}
      </li>
      <li>
        <input type="radio" name="option" class="radiogroup" style="cursor: pointer" id="${
          question.options[1]
        }" value="${question.options[1]}"/> ${question.options[1]}
      </li>
      <li>
        <input type="radio" name="option" class="radiogroup" style="cursor: pointer" id="${
          question.options[2]
        }" value="${question.options[2]}"/> ${question.options[2]}
      </li>
      <li>
        <input type="radio" name="option" class="radiogroup" style="cursor: pointer" id="${
          question.options[3]
        }" value="${question.options[3]}"/> ${question.options[3]}
      </li>
    </div>`;
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

    let radioButtons = document.querySelectorAll(".radiogroup");
    for (let i = 0; i < radioButtons.length; i++) {
      radioButtons[i].addEventListener("click", disableOptions);
    }
  }

  function disableOptions(event) {
    let selectedOption = event.target;
    let radioButtons = document.querySelectorAll(".radiogroup");
    for (let i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i] !== selectedOption) {
        radioButtons[i].disabled = true;
      }
    }
  }

  function nextQuestion() {
    let selectedOption = document.querySelector("input[name='option']:checked");
    let questionName = document.getElementById("question").innerText;

    if (selectedOption) {
      selectedAnswer = selectedOption.value;
      let question = questions[index];
      let object = {
        question: questionName,
        answer: selectedAnswer,
      };

      let parsedAns = [];
      let previousAnswers = localStorage.getItem("userAnswer");

      if (previousAnswers) {
        parsedAns = JSON.parse(previousAnswers);

        let stoploop = false;
        for (let i = 0; i < parsedAns.length; i++) {
          if (parsedAns[i].question == questionName) {
            parsedAns[i].answer = selectedAnswer;
            stoploop = true;
            break;
          }
        }

        if (!stoploop) {
          parsedAns.push(object);
        }
      } else {
        parsedAns.push(object);
      }

      localStorage.setItem("userAnswer", JSON.stringify(parsedAns));

      if (selectedAnswer === question.answer) {
        score++;
      }

      index++;

      if (index < questions.length) {
        showQuestion();
        let questionName = document.getElementById("question").innerText;
        let answer = "";

        let storeAnsers = localStorage.getItem("userAnswer", selectedAnswer);

        if (storeAnsers) {
          let parsedstoredans = JSON.parse(storeAnsers);

          for (let i = 0; i < parsedstoredans.length; i++) {
            if (parsedstoredans[i].question == questionName) {
              answer = parsedstoredans[i].answer;
              break;
            }
          }
        }

        document.getElementById(answer).checked = true;
      } else {
        showScore();
      }
    } else if (selectedOption == null) {
      alert("Please select an answer!");
    }
  }

  function previousQuestion() {
    index--;
    if (index >= 0) {
      showQuestion();
      let questionName = document.getElementById("question").innerText;
      let answer = "";

      let storeAnsers = localStorage.getItem("userAnswer", selectedAnswer);

      if (storeAnsers) {
        let parsedstoredans = JSON.parse(storeAnsers);

        for (let i = 0; i < parsedstoredans.length; i++) {
          if (parsedstoredans[i].question == questionName) {
            answer = parsedstoredans[i].answer;
            break;
          }
        }
      }

      document.getElementById(answer).checked = true;
    } else if (index < 0) {
      alert("You reached first question of the topic!");
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
