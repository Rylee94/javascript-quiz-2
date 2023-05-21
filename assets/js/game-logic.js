var startButton = document.getElementById("start-btn");
var questionContainerEl = document.getElementById("container");
var timeLeftEl = document.getElementById("seconds");
var timerEl = document.getElementById("timer");
var timeInterval;
var timeLeft;
var questionEl = document.querySelector("h2");
var choicesEl = document.querySelector("p");
var questionIndex = 0;
var selectedChoice = null;

var questions = [
  {
    question: "Which is NOT a JS data type?",
    choices: ["pickles", "booleans", "strings", "integers"],
    answer: "pickles",
  },
  {
    question: "Question 2",
    choices: ["pickles", "booleans", "strings", "integers"],
    answer: "pickles",
  },
  {
    question: "Question 3",
    choices: ["pickles", "booleans", "strings", "integers"],
    answer: "pickles",
  },
];

function startGame() {
  console.log("started");
  timeLeft = parseInt(timeLeftEl.textContent);
  startTimer();
  updateQuestion();
}

function countdown() {
  timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timeLeft--;
      timerEl.textContent = timeLeft;
    } else {
      clearInterval(timeInterval);
      console.log("Time's up!");
      nextQuestion();
    }
  }, 1000);
}

function startTimer() {
  countdown();
}

function updateQuestion() {
  var currentQuestion = questions[questionIndex];
  questionEl.textContent = currentQuestion.question;
  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach(function (choice) {
    var choiceButton = document.createElement("button");
    choiceButton.textContent = choice;
    choiceButton.addEventListener("click", function () {
      selectedChoice = choice;
      checkAnswer();
    });
    choicesEl.appendChild(choiceButton);
  });
}

function checkAnswer() {
  var currentQuestion = questions[questionIndex];

  if (selectedChoice === currentQuestion.answer) {
    nextQuestion();
    console.log("Correct answer!");
    nextQuestion();
  } else {
    console.log("Wrong answer!");
    // Perform any action for a wrong answer
  }
}

function nextQuestion() {
  // questionIndex++;
  // if (questionIndex >= questions.length) {
  //   console.log("Game over!");
  //   // Perform any action when all questions are answered
  // } else {
  //   selectedChoice = null; // Reset selected choice for the next question
  //   updateQuestion();
  // }
}

startButton.addEventListener("click", startGame);
