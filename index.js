setInterval(mySecondFunction, 1000)
function mySecondFunction(){
    const d = new Date();
    document.getElementById("demo").innerHTML = d.toLocaleTimeString();
}

const quizData = [
    {
        question: "What city is OAMK located in?",
        options: ["Rovaniemi", "Oulu", "Helsinki", "Oulainen"],
        answer: "Oulu"
    },
    {
        question: "What is the HTML element for the largest heading?",
        options: ["<head>", "<heading>", "<h6>", "<h1>"],
        answer: "<h1>"
    }
]

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resetButton = document.getElementById("reset")

let currentQuestion = 0;
let score = 0;

function showQuestion(){
    const question = quizData[currentQuestion];
    questionElement.innerText = question.question;

    optionsElement.innerHTML = "";
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        optionsElement.appendChild(button);
        button.addEventListener("click", selectAnswer);
    });
}

function selectAnswer(e){
    const selectedButton = e.target;
    const answer = quizData[currentQuestion].answer;

    if (selectedButton.innerText === answer){
        score++;
    }
    
    currentQuestion++;

    if (currentQuestion < quizData.length){
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.innerHTML = "Quiz Completed!";
    optionsElement.innerHTML = `<p>Your score: ${score}/${quizData.length}</p>`;
  }

function resetQuiz(){
    currentQuestion = 0;
    score = 0;

    showQuestion();
}

resetButton.addEventListener("click", resetQuiz);

showQuestion();

