document.addEventListener("DOMContentLoaded", function() {
    const questions = [
        { question: "What is the capital of France?", answerList: { A: "Berlin", B: "Madrid", C: "Paris", D: "Rome" }, correctAnswer: "C" },
        { question: "Which planet is known as the Red Planet?", answerList: { A: "Earth", B: "Mars", C: "Jupiter", D: "Venus" }, correctAnswer: "B" },
        { question: "Who wrote the play 'Romeo and Juliet'?", answerList: { A: "William Shakespeare", B: "Charles Dickens", C: "Jane Austen", D: "Mark Twain" }, correctAnswer: "A" },
        { question: "What is the chemical symbol for water?", answerList: { A: "O2", B: "H2", C: "CO2", D: "H2O" }, correctAnswer: "D" },
        { question: "Which element has the atomic number 1?", answerList: { A: "Helium", B: "Oxygen", C: "Hydrogen", D: "Carbon" }, correctAnswer: "C" },
        { question: "Who was the first President of the United States?", answerList: { A: "Thomas Jefferson", B: "Abraham Lincoln", C: "George Washington", D: "John Adams" }, correctAnswer: "C" },
        { question: "What is the largest ocean on Earth?", answerList: { A: "Atlantic Ocean", B: "Indian Ocean", C: "Arctic Ocean", D: "Pacific Ocean" }, correctAnswer: "D" },
        { question: "Which country is the largest by land area?", answerList: { A: "Canada", B: "United States", C: "Russia", D: "China" }, correctAnswer: "C" },
        { question: "What is the smallest prime number?", answerList: { A: "1", B: "2", C: "3", D: "5" }, correctAnswer: "B" },
        { question: "Which of these is a mammal?", answerList: { A: "Crocodile", B: "Sparrow", C: "Whale", D: "Salmon" }, correctAnswer: "C" },
        { question: "Who painted the Mona Lisa?", answerList: { A: "Vincent van Gogh", B: "Pablo Picasso", C: "Leonardo da Vinci", D: "Claude Monet" }, correctAnswer: "C" },
        { question: "What is the main ingredient in guacamole?", answerList: { A: "Tomato", B: "Avocado", C: "Cucumber", D: "Pepper" }, correctAnswer: "B" },
        { question: "In which year did the Titanic sink?", answerList: { A: "1912", B: "1920", C: "1898", D: "1935" }, correctAnswer: "A" },
        { question: "Which gas is most abundant in the Earth's atmosphere?", answerList: { A: "Oxygen", B: "Hydrogen", C: "Nitrogen", D: "Carbon Dioxide" }, correctAnswer: "C" },
        { question: "What is the hardest natural substance on Earth?", answerList: { A: "Gold", B: "Iron", C: "Diamond", D: "Silver" }, correctAnswer: "C" }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null;
    const answeredCorrectly = new Array(questions.length).fill(false);  // Track if question was answered correctly
    

    const questionElement = document.getElementById('question');
    const optionButtons = document.querySelectorAll('.option');
    const submitButton = document.getElementById('submit');
    const resultDiv = document.getElementById('result');
    const prevButton = document.getElementById('prevBtn');
    const nextButton = document.getElementById('nextBtn');

    function loadQuestion(index) {
        const currentQuestion = questions[index];
        questionElement.textContent = currentQuestion.question;
        optionButtons.forEach(button => {
            const option = button.getAttribute('data-value');
            button.textContent = currentQuestion.answerList[option];
            button.classList.remove('selected');
        });
        selectedOption = null;
        resultDiv.textContent = '';  // Clear previous result message
    }

    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            optionButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            selectedOption = this.getAttribute('data-value');
        });
    });

    submitButton.addEventListener('click', function() {
        if (selectedOption) {
            const currentQuestion = questions[currentQuestionIndex];
            if (selectedOption === currentQuestion.correctAnswer) {
                if (!answeredCorrectly[currentQuestionIndex]) {
                    score++;
                    answeredCorrectly[currentQuestionIndex] = true;
                }
            } else {
                if (answeredCorrectly[currentQuestionIndex]) {
                    score--;
                    answeredCorrectly[currentQuestionIndex] = false;
                }
            }
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                loadQuestion(currentQuestionIndex);
            } else {
                resultDiv.textContent = `You scored ${score} out of ${questions.length}`;
                resultDiv.classList.add('alert-success');
                resultDiv.classList.remove('alert-danger');
                submitButton.disabled = true;  // Disable submit button after quiz is over
            }
        } else {
            resultDiv.textContent = 'Please select an option first.';
            resultDiv.classList.add('alert-danger');
            resultDiv.classList.remove('alert-success');
        }
    });

    prevButton.addEventListener('click', function() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
        }
    });

    nextButton.addEventListener('click', function() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
        }
    });
    console.log(answeredCorrectly);

    loadQuestion(currentQuestionIndex);
});
