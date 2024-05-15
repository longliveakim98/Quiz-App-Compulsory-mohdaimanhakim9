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
score = 0;
const correctAnswer = new Array(questions.length).fill(false);

console.log(correctAnswer);

function buttonSelect(option){
    const btnOption = document.querySelectorAll('.option');
    btnOption.forEach(button => button.classList.remove("selected"));
    option.classList.add("selected");

}

function loadQuestion(index){
    const questionElement = document.getElementById('question');
    const question = questions[index];
    const option = document.querySelectorAll('.option');
    const reset = document.getElementById('reset');

    reset.style.display = 'none';
    questionElement.textContent = question.question ;

    option.forEach((button,i)=>{
        const optionKey = Object.keys(question.answerList)[i];
        button.textContent = question.answerList[optionKey];
        button.classList.remove('selected');
    });

    const result = document.getElementById('result');
    result.textContent = '';

}

function submit(){
    const selectedButton = document.querySelector('.option.selected');
    const result = document.getElementById('result')
    const selected = selectedButton.dataset.value;
    const currentQ = questions[currentQuestionIndex];
    const reset = document.getElementById('reset');

    if(selected===currentQ.correctAnswer){
        correctAnswer[currentQuestionIndex] = true;
        score++;

    } else{
        correctAnswer[currentQuestionIndex] = false;        
    }

    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        loadQuestion(currentQuestionIndex);
    } else {
        score = correctAnswer.filter(Boolean).length;
        result.textContent =  `Quiz done! Your score is ${score}/15`;
        const submitbutton = document.getElementById('submit');
        submitbutton.setAttribute('disabled','');
        reset.style.display = 'block';
    }
}

function reset(){
    currentQuestionIndex = 0;
    score = 0;
    correctAnswer.fill(false);
    const submitbutton = document.getElementById('submit');
    submitbutton.removeAttribute('disabled');
    loadQuestion(currentQuestionIndex);
}


function previous(){
    if(currentQuestionIndex > 0){
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
}

function next(){
    if(currentQuestionIndex < questions.length - 1){
        currentQuestionIndex++;

        loadQuestion(currentQuestionIndex);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadQuestion(currentQuestionIndex);
});

document.getElementById('prev').addEventListener('click', previous);
document.getElementById('next').addEventListener('click',next);
document.getElementById('submit').addEventListener('click',submit);
document.getElementById('reset').addEventListener('click',reset);