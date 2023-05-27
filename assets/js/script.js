var timeInterval;
var timeLeft;
var startButton = document.getElementById("startButton");
var timerEl = document.getElementById("timer");
var questionIndex = 0;
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var resultEl = document.getElementById("result");
var selectedChoice = null;
var highscoreList = document.getElementById("highscoreList");

function startGame() {
  console.log("started");
  timeLeft = parseInt(timerEl.textContent);
  startTimer();
  updateQuestion();
  startButton.style.display = "none";
}

function startTimer() {
  countdown();
}

//timer function
function countdown() {
  timeInterval = setInterval(function () {
    if (timeLeft > 0) {
      timeLeft--;
      timerEl.textContent = timeLeft;
    } else {
      clearInterval(timeInterval);
      questionEl.textContent = "All done!";
      choicesEl.innerHTML = "";
      resultEl.textContent = "Your score is: " + timeLeft;

      var nameInput = document.createElement("input");
      nameInput.setAttribute("type", "text");
      nameInput.setAttribute("placeholder", "Enter your initials");
      choicesEl.appendChild(nameInput);

      var submitButton = document.createElement("button");
      submitButton.textContent = "Submit";
      submitButton.addEventListener("click", function () {
        var playerName = nameInput.value;
        console.log("Player Name:", playerName);
        var playerScore = timeLeft;
        saveHighScore(playerName, playerScore);
        // Redirect to high scores page
        window.location.href = "highscores.html"; // Replace with the actual URL of your high scores page
      });
      choicesEl.appendChild(submitButton);
    }
  }, 1000);
}

startButton.addEventListener("click", startGame);

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
  var resultText;

  if (selectedChoice === currentQuestion.answer) {
    resultText = "Correct answer!";
  } else {
    resultText = "Wrong answer!";
    timeLeft -= 15;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
    timerEl.textContent = timeLeft;
  }

  resultEl.textContent = resultText;

  setTimeout(function () {
    resultEl.textContent = "";
    nextQuestion();
  }, 800);
}

function nextQuestion() {
  questionIndex++;

  if (questionIndex < questions.length) {
    selectedChoice = null;
    resultEl.textContent = "";
    updateQuestion();
  } else if (questionIndex === questions.length) {
    questionEl.textContent = "All done!";
    choicesEl.innerHTML = "";
    clearInterval(timeInterval);
    resultEl.textContent = "Your score is: " + timeLeft;

    var nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("placeholder", "Enter your initials");
    choicesEl.appendChild(nameInput);

    var submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", function () {
      var playerName = nameInput.value;
      console.log("Player Name:", playerName);
      var playerScore = timeLeft;
      saveHighScore(playerName, playerScore);
      // Redirect to high scores page
      window.location.href = "highscores.html"; // Replace with the actual URL of your high scores page
    });
    choicesEl.appendChild(submitButton);
  }
}

function getHighScores() {
  var highscores = localStorage.getItem("highscores");
  if (highscores) {
    return JSON.parse(highscores);
  } else {
    return [];
  }
}

function saveHighScore(playerName, playerScore) {
  var highscores = getHighScores();
  highscores.push({ name: playerName, score: playerScore });
  localStorage.setItem("highscores", JSON.stringify(highscores));
}

// Function to update the high score list
function updateHighScoreList() {
  var highscores = getHighScores();

  // Sort the scores in descending order
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  var highscoreList = document.getElementById("highscoreList");
  highscoreList.innerHTML = ""; // Clear the previous list

  highscores.forEach(function (score) {
    var listItem = document.createElement("li");
    listItem.textContent = score.name + ": " + score.score;
    highscoreList.appendChild(listItem);
  });
}

// Call the function to update the high score list when the page loads
updateHighScoreList();

// Add an event listener to the clearButton
var clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", clearHighScores);

// Function to clear the high scores
function clearHighScores() {
  localStorage.removeItem("highscores");
  updateHighScoreList(); // Update the high score list after clearing
}
