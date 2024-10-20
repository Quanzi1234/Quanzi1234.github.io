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
    optionsElement.innerHTML = `<p>Your score: ${score}/${quizData.length}</p><br></br> <iframe width="420" height="315"
src="https://www.youtube.com/embed/tgbNymZ7vqY">
</iframe> `;
  }

function resetQuiz(){
    currentQuestion = 0;
    score = 0;

    showQuestion();
}

resetButton.addEventListener("click", resetQuiz);

showQuestion();

const menuToggle = document.getElementById('menu-toggle');
const menu = document.querySelector('.menu');
const mainContent = document.querySelector('.main')

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('visible');
    menuToggle.innerText = menu.classList.contains('visible') ? 'Hide Menu' : 'Show Menu';
    
    mainContent.style.marginLeft = menu.classList.contains('visible') ? '168px' : '0';
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        menu.classList.remove('visible');
        mainContent.style.marginLeft = '168px';
    } else if (window.innerWidth < 768) {
        if (mainContent.style.marginLeft == '168px') {
            mainContent.style.marginLeft = menu.classList.contains('visible') ? '168px' : '0';
        }
    } else if (menuToggle.innerText == 'Hide Menu') {
        menuToggle.innerText = menu.classList.contains('visible') ? 'Hide Menu' : 'Show Menu';
    }
});

const getCountries = async () => {
    try {
        const response = await fetch('countries.txt');
        const data = await response.text();
        const countries = data.split('\n');
        
        const parent = document.querySelector('#countries');
        if (countries) {
            countries.forEach((country) => {
                const option = document.createElement('option');
                option.value = country.trim();
                option.text = country.trim();
                parent.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
};

getCountries();