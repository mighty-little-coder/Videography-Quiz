var goQuizBtn = document.querySelector(".goButton");
var quizPage = document.querySelector("#quizPages");
var welcomePage = document.querySelector("#loadingPage");
var timerEl = document.querySelector(".quizTimer");
var startBtn = document.querySelector(".startButton");
var questionEl = document.querySelector(".questionBox");
var answerEl = document.querySelector(".answersArea");
var scoreNav = document.querySelector(".quizEndScore");
var startAgain = document.querySelector(".doBetter");
var goQuizBtn = document.querySelector(".goButton");
var questionTitleEl = document.querySelector("#question");
var answerTabsEl = document.querySelector("#answerTabs");
var questionIndex = 0
var userScore = 0
var questions = [
  {
    questionTitle: "What is \"aperture\"?",
    answersArray: ["Fun indie game available for free on Steam", "Opening within the lens that controls amount of light that enters the camera's sensor", "A tiny apartment", "The record button"],
    correctAnswer: "Opening within the lens that controls amount of light that enters the camera's sensor"
  },
  
  {
    questionTitle: "What is \"depth of field\"?",
    answersArray: ["The distance between the closest and farthest objects in frame", "How far a quarterback can successfully complete a pass", "How long a lens is", "How far a lens can zoom"],
    correctAnswer: "Four"
  },
  
  {
    questionTitle: "Which brand has the largest array of lens available?",
    answersArray: ["Sony", "Lumix", "Canon", "Fujifilm"],
    correctAnswer: "Canon"
  },
  
  {
    questionTitle: "Which brand is responsible for the extremely popular \"ef\" lens mounting system",
    answersArray: ["Sony", "Lumix", "Canon", "Fujifilm"],
    correctAnswer: "Canon"
  },
  
  {
    questionTitle: "How do DSLRs and mirrorless cameras differ?",
    answersArray: ["Viewfinder (digital vs analog)", "Weight (camera body weights differ significantly)", "Sensor (different sensors are used to capture content)", "All of the above (all of these are true)"],
    correctAnswer: "All of the above (all of these are true)"
  },
  
  {
    questionTitle: "Who is responsible for the overall direction of the project on set?",
    answersArray: ["Key grip", "Director of Photography (DP)", "Audio Engineer", "Camera operator"],
    correctAnswer: "Director of Photography (DP)"
  },
  
  {
    questionTitle: "Which size resolution is commonly known as \"4K\"?",
    answersArray: ["720px x 480px", "1920px x 1080px", "3840px x 2160px", "7680px x 4320px"],
    correctAnswer: "3840px x 2160px"
  },
  
  {
    questionTitle: "Which lens would show the shallowest depth of field at the same focal length?",
    answersArray: ["8.0", "5.6", "2.0", "1.4"],
    correctAnswer: "1.4"
  },
  
  {
    questionTitle: "What is focal length?",
    answersArray: ["Distance from a lens to it's point of focus", "Distance a lens has the ability to keep in focus", "Length of the len's glass elements", "The length of time a lense can remain focused on one element"],
    correctAnswer: "Distance from a lens to it's point of focus"
  },
  
  {
    questionTitle: "What is directly effected by the \"F-stop\" of a lens",
    answersArray: ["shutter speed", "ISO", "frames per second", "aperture size"],
    correctAnswer: "aperture size"
  },
  
  {
    questionTitle: "Which ISO would allow for the most amount of added light to an image / shot?",
    answersArray: ["200", "400", "1000", "3200"],
    correctAnswer: "3200"
  },
  
  {
    questionTitle: "What does the \"speed\" of a lens refer to?",
    answersArray: ["How fast a lens captures images", "How slow a camera can record to capture smooth slow motion footage", "Maximum aperture diameter", "Minimum aperture diameter"],
    correctAnswer: "Maximum aperture diameter"
  },
  
  {
    questionTitle: "Where does the term \"film grain\" come form?",
    answersArray: ["Small bits of film that is fed to birds", "Granularity of a photo or video from when film was the predominant media", "Film gluten", "Instagram filter"],
    correctAnswer: "Granularity of a photo or video from when film was the predominant media"
  },
  
  {
    questionTitle: "What is a \"LUT\"?",
    answersArray: ["Camera brand", "IDK. Google it", "Colorizing preset", "Term used for a someone working on set"],
    correctAnswer: "Colorizing preset"
  },
  
  {
    questionTitle: "Which frame rate would produce the clearest slow motion footage?",
    answersArray: ["24fps", "60fps", "120fps", "240fps"],
    correctAnswer: "240fps"
  },
]
var finalPage = document.querySelector("#scoresPage");
var renderHighScores = document.querySelector(".scoreLog");
var startAgain = document.querySelector(".doBetter");
var improveBtn = document.querySelector(".resetQuiz");
var scoreSheet = document.querySelector(".scoreBoard");
var numCorrectAns = document.querySelector("#correctNum");
var answerPercentage = document.querySelector("#percentage")
var spareTimer = document.querySelector("#leftOverTime");
var renderAnswersEl = document.querySelector(".renderAllAnswers");
var renderCheckAns = document.querySelector(".checkAnswers");
var userNameSpan = document.querySelector("userNameScore");
var submitUserName = document.querySelector("submit");
var timeLeft = 45;
var percentage = (userScore/questions.length) * 100;

document.querySelector(".goButton").addEventListener("click", initiateQuiz);
document.querySelector(".startButton").addEventListener("click", setTime);
document.querySelector(".startButton").addEventListener("click", quizStart);
document.querySelector(".quizEndScore").addEventListener("click", goToScores);
document.querySelector(".scoreLog").addEventListener("click", goToHighscores);
document.querySelector(".doBetter").addEventListener("click", goToStart);
document.querySelector(".resetQuiz").addEventListener("click", goToStart);
document.querySelector(".renderAllAnswers").addEventListener("click", renderAnswers);
document.querySelector("submit").addEventListener("submit", function(event) {
  event.preventDefault()});

function initiateQuiz() {
  loadingPage.style.display = "none"
  quizPages.style.display = "block"
}

function quizStart() {
  startBtn.style.display = "none";
  timerEl.style.display = "flex";
  questionEl.style.display = "flex";
  answerEl.style.display = "flex";
  generateQuestion()
}

function quizOver() {
  timerEl.remove()
  timerEl.textContent = "FINISHED!"
  questionEl.style.display = "none";
  answerEl.style.display = "none";
  scoreNav.style.display = "flex";
}

function generateQuestion() {
  if (questionIndex < questions.length) {
    questionTitleEl.textContent = questions[questionIndex].questionTitle;
    answerTabsEl.innerHTML = "";
    questions[questionIndex].answersArray.forEach(function (choice, i) {
      var tempBtn = document.createElement("button");
      tempBtn.textContent = choice;
      tempBtn.setAttribute("class", "answerBtn")
      tempBtn.setAttribute("value", choice);
      tempBtn.onclick = checkAnswer;
      answerTabsEl.appendChild(tempBtn)
    })
  } else {
    quizOver()
  }
}

function setTime() {
  timeLeft = 45
  var timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = ("Time Remaining: " + timeLeft);

    if (!timeLeft) {
      clearTimeout(timerInterval)
      timerEl.textContent = "TIME IS UP!"
      questionEl.style.display = "none";
      answerEl.style.display = "none";
      scoreNav.style.display = "flex";
    }
  }, 1000);
}

function checkAnswer() {
  var correctAnswer = questions[questionIndex].correctAnswer;
  var selectedAnswer = this.value
  if (questionIndex < questions.length) {
    if (selectedAnswer == correctAnswer) {
      userScore += 1;
      console.log("Correct Answer!")
      console.log("Total Questions Answered Correctly: " + userScore)
    } else {
      timeLeft -= 3;
      console.log("Wrong Answer");
    }
    questionIndex++;
    generateQuestion()
  } else {
    quizOver()
  }
}

console.log(questionIndex)
console.log(questions)

// function saveScore() {
//   localStorage.setItem("userScore", JSON.stringify(userScore));
// }

// userScoreForm.addEventListener("submit", function(event) {
//   event.preventDefault();
//   var userScoreText = user
// })

function renderLastRegistered() {
  var userName = localStorage.getItem("userName");
  if (!userName) {
    return;
  }

  userNameSpan.textContent = userNameScore;
  userScoreSpan.textContent = userScoreTally;
}

button.addEventListener("click", function(event) {
  event.preventDefault();

  if (userName === "") {
    displayMessage("Error", "Username field cannot be blank");
  } else {
    displayMessage("Success!", "Your name has been added to list of the best videography quiz takers ever!");

    localStorage.setItem("userName", userName);
    localStorage.setItem("userScore", userScore);
    renderLastRegistered();
  }
});

function goToScores() {
  quizPages.style.display = "none";
  scoresPage.style.display = "block";
// ENTER CODE FOR TEXTCONTENT PERCENTAGE SCORE
// answerPercentage.textContent = "Your score is: " + percentage + "%";
  numCorrectAns.textContent = "You answered " + userScore + " out of 15 correctly!";
  // Would like to add functionality for capturing and rendering how much time was remaining
  // spareTimer.textContent = timeLeft
}

function goToStart() {
  location.reload()
}

function goToHighscores() {
  scoreSheet.style.display = "flex";
  improveBtn.style.display = "flex";
  renderCheckAns.style.display = "none";
}

function renderAnswers() {
  scoreSheet.style.display = "none";
  if (renderCheckAns.style.display = "none") {
    renderCheckAns.style.display = "flex";
  } else {
    renderCheckAns.style.display = "none";
  }
}

