var timeInterval;
var timeLeft;
var startButton = document.getElementById("startButton");
var timerEl = document.getElementById("timer");
var questionIndex = 0;
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var resultEl = document.getElementById("result"); // Element to display the result
var selectedChoice = null; // Variable to store the selected choice

function startGame() {
  console.log("started");
  timeLeft = parseInt(timerEl.textContent);
  startTimer();
  updateQuestion();
  startButton.style.display = "none"; // Hide the start button
}

function startTimer() {
  countdown();
}

// Function to start the timer
function countdown() {
  timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timeLeft--;
      timerEl.textContent = timeLeft;
    } else {
      clearInterval(timeInterval);
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
  var resultText; // Variable to store the result text

  if (selectedChoice === currentQuestion.answer) {
    resultText = "Correct answer!";
  } else {
    resultText = "Wrong answer!";
    timeLeft -= 15; // Decrease the timer by 15 seconds
    if (timeLeft < 0) {
      timeLeft = 0; // Ensure the timer doesn't go below zero
    }
    timerEl.textContent = timeLeft; // Update the timer display
  }

  resultEl.textContent = resultText; // Display the result

  // Use setTimeout to delay the nextQuestion() call by a short time
  setTimeout(function () {
    nextQuestion();
  }, 500); // Adjust the delay time as needed
}

function nextQuestion() {
  questionIndex++;

  if (questionIndex < questions.length) {
    selectedChoice = null; // Reset selected choice for the next question
    resultEl.textContent = ""; // Clear the result
    updateQuestion();
  } else if (questionIndex === questions.length) {
    questionEl.textContent = "All done!";
    choicesEl.innerHTML = "";
    clearInterval(timeInterval); // Pause the timer
    timerEl.textContent = "Seconds left: " + timeLeft; // Display remaining seconds
    resultEl.textContent = ""; // Clear the result

    // Create a text input element
    var nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("placeholder", "Enter your initials");
    choicesEl.appendChild(nameInput);

    // Create a submit button
    var submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", function () {
      var playerName = nameInput.value;
      // Process the submitted name as needed
      console.log("Player Name:", playerName);
      // Perform any other actions when the form is submitted
    });
    choicesEl.appendChild(submitButton);

    // Perform any action when all questions are answered
  }
}
