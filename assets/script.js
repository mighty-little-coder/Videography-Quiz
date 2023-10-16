var goQuizBtn = document.querySelector(".goButton")
var quizPage = document.querySelector("#quizPages")
var welcomePage = document.querySelector("#loadingPage")

document.querySelector(".goButton").addEventListener("click", initiateQuiz)

function initiateQuiz() {
 loadingPage.style.display = "none"
 quizPages.style.display = "block"
}
