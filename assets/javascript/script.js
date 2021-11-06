// write our questions

const questions = [
    {
        question: "Commonly used data types Do Not include:",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "4. numbers"
    },
    {
        question: "The condition in an if / else statement is enclosed with ______.",
        choices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        answer: "2. curly brackets"
    },
    {
        question: "Arrays in JavaScript can be used to store ______.",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above"
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        answer: "3. quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        answer: "4. console.log"
    }
];

// create var to make references to elements

var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

var startDiv = document.getElementById("start");
var startQuiz = document.getElementById("startQuiz");

var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");

var choice1 = document.getElementById("button1");
var choice2 = document.getElementById("button2");
var choice3 = document.getElementById("button3");
var choice4 = document.getElementById("button4");
var answerCheck = document.getElementById("answerCheck");

var summary = document.getElementById("summary");
var submitInitialsBtn = document.getElementById("submitInitialsBtn");
var initials = document.getElementById("initials");
var mainPage = document.getElementById("mainPage");

var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");

var backBtn = document.getElementById("backBtn");
var clearBtn = document.getElementById("clearBtn");
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");

var correctAnswer = 0;
var questionNumber = 0;
var scoreResult;
var questionIndex = 0;

// when I click the start quiz button, the timer starts

var totalTime = 151;

function newQuiz() {

    questionIndex = 0;
    totalTime = 150;
    timeLeft.textContent = totalTime;
    initials.textContent = "";

    startDiv.style.display = "none";
    questionDiv.style.display = "block";
    timer.style.display = "block";
    timesUp.style.display = "none";

    var startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if (totalTime <= 0) {
            clearInterval(startTimer);
                if (questionIndex < questions.length - 1) {
                    gameOver();
                }
        }
    }, 1000);
    showQuiz();
};

// show the quiz questions

function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    choice1.textContent = questions[questionIndex].choices[0]
    choice2.textContent = questions[questionIndex].choices[1]
    choice3.textContent = questions[questionIndex].choices[2]
    choice4.textContent = questions[questionIndex].choices[3]
}

// show if answered correctly or wrongly

function checkAnswer(answer) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answerCheck.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        correctAnswer++;

        answerCheck.textContent = "Correct!";
    } else {
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = "Wrong! The correct answer is " + questions[questionIndex].answer;
    }

    questionIndex++;
    // cycle through the other questions until game over

    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        gameOver();
    }
}

function choose1() { checkAnswer(0); }
function choose2() { checkAnswer(1); }
function choose3() { checkAnswer(2); }
function choose4() { checkAnswer(3); }

// when timer reaches 0 or all questions are answered: game over

function gameOver() {
    summary.style.display = "block";
    questionDiv.style.display = "none";
    startDiv.style.display = "none";
    timer.style.display = "none"
    timesUp.style.display = "block";

    //show final score
    finalScore.textContent = correctAnswer;
}

// enter initials and final score
function storeHighScores(event) {
    event.preventDefault();

    if(initials.value === "") {
        alert("Please enter your initials!");
        return;
    }

    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    // store score in local storage
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initials.value,
        score: finalScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);

    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);

    showHighScores();
}

// function to show high scores

var i = 0;
function showHighScores() {

    startDiv.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    if (savedHighScores === null) {
        return;
    }

    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}

// event listeners

startQuiz.addEventListener("click", newQuiz);
choice1.addEventListener("click", choose1);
choice2.addEventListener("click", choose2);
choice3.addEventListener("click", choose3);
choice4.addEventListener("click", choose4);

submitInitialsBtn.addEventListener("click", function(event) {
    storeHighScores(event);
});

viewHighScore.addEventListener("click", function() {
    startDiv.style.display = "none";
    highScoreSection.style.display = "block";
});

backBtn.addEventListener("click", function() {
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
})

clearBtn.addEventListener("click", function() {
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: sans-serif; font-style: italic")
});