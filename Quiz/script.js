let questions = [];
let currentQuestionIndex = 0;
let score = 0;

async function fetchQuestions() {
    const response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple');
    const data = await response.json();
    questions = data.results.map(question => ({
        question: question.question,
        options: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5), // Shuffle options
        answer: question.correct_answer
    }));
    loadQuestion();
}

function loadQuestion() {
    const questionElement = document.getElementById('quiz');
    const currentQuestion = questions[currentQuestionIndex];

    questionElement.innerHTML = `
        <h2>${currentQuestion.question}</h2>
        ${currentQuestion.options.map(option => `
            <button onclick="checkAnswer('${option}')">${option}</button>
        `).join('')}
    `;

    document.getElementById('nextButton').style.display = currentQuestionIndex < questions.length - 1 ? 'block' : 'none';
    
    questionElement.classList.remove('hidden');
    questionElement.style.opacity = 0; // Start hidden
    setTimeout(() => {
        questionElement.style.transition = "opacity 0.5s ease";
        questionElement.style.opacity = 1; // Fade in
    }, 10);
}

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('nextButton').style.display = 'none'; // Hide Next button

    const scoreElement = document.getElementById('score');
    let message = '';
    let emoji = '';

    if (score < 5) {
        message = "You failed! Try again!";
        emoji = "😢"; // Sad emoji
    } else if (score < 10) {
        message = "You win! Great job!";
        emoji = "😊"; // Happy emoji
    } else {
        message = "You got a perfect score! Amazing!";
        emoji = "💃🕺"; // Dancing emoji
        // Add dancing animation class
        document.getElementById('scoreContainer').classList.add('dancing');
    }

    scoreElement.innerHTML = `${message} ${emoji} <br>Your Score: ${score}`;
    document.getElementById('scoreContainer').classList.remove('hidden');
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('scoreContainer').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden'); // Show the quiz again
    fetchQuestions(); // Fetch new questions
}

// Start the quiz by fetching questions
fetchQuestions();
