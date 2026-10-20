const quizData = [
    {
        question: "Quantas Champions League o Real Madrid possui?",
        options: ["13", "14", "15", "16"],
        correct: 2
    },
    {
        question: "Quem é o maior artilheiro da história do clube?",
        options: ["Raúl", "Karim Benzema", "Cristiano Ronaldo", "Alfredo Di Stéfano"],
        correct: 2
    },
    {
        question: "Em que ano o Real Madrid foi fundado?",
        options: ["1902", "1910", "1899", "1924"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionTextElement = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const correctAnswersSpan = document.getElementById("correct-answers");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    totalQuestionsSpan.innerText = quizData.length;
    scoreContainer.classList.add("hidden");
    nextButton.classList.add("hidden");
    optionsContainer.classList.remove("hidden");
    questionTextElement.classList.remove("hidden");
    showQuestion();
}

function showQuestion() {
    resetState();
    currentQuestionSpan.innerText = currentQuestionIndex + 1;
    
    let currentQuestion = quizData[currentQuestionIndex];
    questionTextElement.innerText = currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(index, button));
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add("hidden");
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectOption(selectedIndex, clickedButton) {
    const correctAnswerIndex = quizData[currentQuestionIndex].correct;
    const allButtons = optionsContainer.querySelectorAll(".option-btn");

    allButtons.forEach(button => button.disabled = true);

    if (selectedIndex === correctAnswerIndex) {
        clickedButton.classList.add("correct");
        score++;
    } else {
        clickedButton.classList.add("wrong");
        allButtons[correctAnswerIndex].classList.add("correct");
    }

    nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionTextElement.classList.add("hidden");
    optionsContainer.classList.add("hidden");
    scoreContainer.classList.remove("hidden");
    correctAnswersSpan.innerText = score;
}

function restartQuiz() {
    startQuiz();
}


startQuiz();
