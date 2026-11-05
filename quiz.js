
const quizData = [

    {
        question: "Quantas Champions League o Real Madrid conquistou até 2024?",
        options: ["13", "14", "15", "16"],
        correct: 2
    },

    {
        question: "Quem é o maior artilheiro da história do clube?",
        options: ["Raúl", "Benzema", "Cristiano Ronaldo", "Di Stéfano"],
        correct: 2
    },

    {
        question: "Em que ano o Real Madrid foi fundado?",
        options: ["1902", "1910", "1899", "1924"],
        correct: 0
    },

    {
        question: "Qual é o estádio do Real Madrid?",
        options: ["Camp Nou", "Santiago Bernabéu", "Wembley", "Metropolitano"],
        correct: 1
    },

    {
        question: "Qual é o apelido do Real Madrid?",
        options: ["Os Culés", "Os Merengues", "Os Reds", "Os Blues"],
        correct: 1
    },

    {
        question: "Qual jogador ficou conhecido como CR7?",
        options: ["Kaká", "Cristiano Ronaldo", "Ronaldo Fenômeno", "Benzema"],
        correct: 1
    },

    {
        question: "Qual é a cor tradicional do uniforme principal?",
        options: ["Azul", "Vermelho", "Branco", "Preto"],
        correct: 2
    },

    {
        question: "Quem foi conhecido como La Saeta Rubia?",
        options: ["Raúl", "Di Stéfano", "Casillas", "Zidane"],
        correct: 1
    },

    {
        question: "Qual goleiro espanhol foi ídolo do Real Madrid?",
        options: ["Buffon", "Casillas", "Neuer", "Dida"],
        correct: 1
    },

    {
        question: "Qual desses jogadores é brasileiro?",
        options: ["Modric", "Vinícius Júnior", "Bellingham", "Kroos"],
        correct: 1
    },

    {
        question: "Quem treinou o Real Madrid na conquista da Champions de 2022?",
        options: ["Zidane", "Ancelotti", "Mourinho", "Benítez"],
        correct: 1
    },

    {
        question: "Qual jogador francês foi destaque do Real Madrid?",
        options: ["Mbappé", "Henry", "Ribéry", "Griezmann"],
        correct: 0
    },

    {
        question: "Qual é o nome completo do clube?",
        options: [
            "Real Madrid Club de Fútbol",
            "Madrid Futebol Clube",
            "Madrid Royal Club",
            "Real Futebol Espanhol"
        ],
        correct: 0
    },

    {
        question: "Qual jogador português marcou muitos gols pelo Real Madrid?",
        options: ["Figo", "Cristiano Ronaldo", "Pepe", "Deco"],
        correct: 1
    },

    {
        question: "Qual é o lema popular da torcida do Real Madrid?",
        options: [
            "You'll Never Walk Alone",
            "Visca Barça",
            "Hala Madrid",
            "Forza Milan"
        ],
        correct: 2
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
const progressFill = document.getElementById("progress-fill");
const scoreMessage = document.getElementById("score-message");

function startQuiz() {

    currentQuestionIndex = 0;
    score = 0;

    totalQuestionsSpan.innerText = quizData.length;

    scoreContainer.classList.add("hidden");
    nextButton.classList.add("hidden");

    document.getElementById("quiz-content").classList.remove("hidden");

    showQuestion();
}

function showQuestion() {

    resetState();

    const currentQuestion = quizData[currentQuestionIndex];

    currentQuestionSpan.innerText = currentQuestionIndex + 1;

    questionTextElement.innerText = currentQuestion.question;

    progressFill.style.width =
        ((currentQuestionIndex + 1) / quizData.length) * 100 + "%";

    currentQuestion.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.innerText = option;
        button.classList.add("option-btn");

        button.addEventListener("click", () => {
            selectOption(index, button);
        });

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

    const correctAnswerIndex =
        quizData[currentQuestionIndex].correct;

    const allButtons =
        optionsContainer.querySelectorAll(".option-btn");

    allButtons.forEach(button => {
        button.disabled = true;
    });

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

    document.getElementById("quiz-content").classList.add("hidden");

    nextButton.classList.add("hidden");

    scoreContainer.classList.remove("hidden");

    correctAnswersSpan.innerText = score;

    if (score === quizData.length) {

        scoreMessage.innerText = "PERFEITO! Você é um verdadeiro Madridista!";

    } else if (score >= 10) {

        scoreMessage.innerText = "Excelente! Você conhece muito sobre o Real Madrid!";

    } else if (score >= 5) {

        scoreMessage.innerText = "Muito bem! Continue aprendendo sobre o clube!";

    } else {

        scoreMessage.innerText = "Continue estudando a história do maior clube do mundo!";

    }

}

function restartQuiz() {

    startQuiz();

}

startQuiz();
