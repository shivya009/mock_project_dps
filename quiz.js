document.addEventListener("DOMContentLoaded", function() {
    const startQuizButton = document.getElementById("startQuiz");
    const quizForm = document.getElementById("quizForm");
    const quizContainer = document.getElementById("quizContainer");
    const questionText = document.getElementById("questionText");
    const optionALabel = document.getElementById("optionALabel");
    const optionBLabel = document.getElementById("optionBLabel");
    const optionCLabel = document.getElementById("optionCLabel");
    const optionDLabel = document.getElementById("optionDLabel");
    const nextButton = document.getElementById("nextButton");
    const questionContainer = document.getElementById("question-container");


    startQuizButton.addEventListener("click", function() {
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const category = document.getElementById("category").value;
        const numQuestions = document.getElementById("numQuestions").value;
        const difficulty = document.getElementById("difficulty").value;
        
        // Hide the form and show the quiz container
        quizForm.style.display = "none";
        quizContainer.style.display = "block";
        questionContainer.style.display = "block";
        

        fetchQuizQuestions(category, numQuestions, difficulty);
    });



    // document.getElementById('registration-form')?.addEventListener('submit', function(event) {

    //     event.preventDefault();
        
    //     //fetch input values and store in variable 
    //     var numberOfQuestions = document.getElementById('number-question').value;
    //     var name=document.getElementById('user-name').value;
    //     var email=document.getElementById('email').value;
        
    //     //Checking if radio buttons are selected and fetching category,level only post that.
    //     var check1=document.querySelector('input[name="category"]:checked');
    //     var check2=document.querySelector('input[name="level"]:checked');
        
    //     if(check1!=null)
    //     {
    //         var questionCategory = document.querySelector('input[name="category"]:checked').value;   
    //     }
    //     if(check2!=null)
    //     {
    //     var level = document.querySelector('input[name="level"]:checked').value;
    //     }

    
    
    async function fetchQuizQuestions(category, numQuestions, difficulty) {
        const apiUrl = 'https://opentdb.com/api.php?amount='+numQuestions+'&category='+category+'&difficulty='+difficulty+'&type='+'multiple';

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.results.length > 0) {
                const questions = data.results;
                let currentQuestionIndex = 0;

                displayQuestion(questions[currentQuestionIndex]);
                
                // Add event listener for next question
                const nextButton = document.getElementById("nextButton");
                const submitButton = document.getElementById("submitButton");

                submitButton.addEventListener("click", function() {
                    submitButton.style.display = "none";
                    nextButton.style.display = "block";
                    
                    checkAnswer();
                });
                
                nextButton.addEventListener("click", function() { 
                    submitButton.style.display = "block";
                    nextButton.style.display = "none";                 
                    
                    currentQuestionIndex++;
                    if (currentQuestionIndex < questions.length) {
                        displayQuestion(questions[currentQuestionIndex]);
                    } else {
                        // Display quiz results or completion message
                        quizContainer.innerHTML = `<h2>Congratulations, you've completed the quiz!</h2><br><h2>
                        Your Score: ${userScore} </h2>`;
                    }
                });
                userScore=0;
function checkAnswer() {
    const selectedAnswer = document.querySelector('input[type="radio"]:checked');
    if(selectedAnswer==null){
        window.alert("select answer");
    }
    const selectedAnswerElement = document.getElementById(selectedAnswer.value);
    console.log(selectedAnswerElement)
    q = questions[currentQuestionIndex]
    const correctAnswerElement = document.getElementById(q.correct_answer)
    
    if (selectedAnswer && selectedAnswer.value === questions[currentQuestionIndex].correct_answer) {
        userScore++;
        scoreElement = document.getElementById("score")
        scoreElement.textContent = `Score: ${userScore}`;

        selectedAnswerElement.style.backgroundColor = "green";
        selectedAnswerElement.style.color = "white";
    }
    else{
        correctAnswerElement.style.backgroundColor = "green";
        correctAnswerElement.style.color = "white";
        selectedAnswerElement.style.backgroundColor = "red";
        selectedAnswerElement.style.color = "white";
    }
    
    
    
}
            } else {
                quizContainer.innerHTML = `<p>No questions available for the selected criteria.</p>`;
            }
        } catch (error) {
            console.error("Error fetching quiz questions:", error);
            quizContainer.innerHTML = `<p>An error occurred while fetching quiz questions.</p>`;
        }
    }

    function displayQuestion(question) {
        const questionElement = document.getElementById("question");
        const optionsElement = document.getElementById("options");
        clearInterval(timer);
        startTimer();

        questionElement.innerHTML = question.question;
        
        const options = shuffleArray([...question.incorrect_answers, question.correct_answer]);
        
        optionsElement.innerHTML = options
            .map(option => `<div id='${option}'><label ><input type="radio" name="${option}" value="${option}"> ${option}</label></div><br>`)
            .join('');

    }

    // Function to shuffle an array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});

function startTimer() {
    let seconds = 20;
    timer = setInterval(function() {
        timerElement = document.getElementById("timer")
        timerElement.textContent = `Time left: ${seconds}`;
        seconds--;
        if (seconds < 0) {
            clearInterval(timer);
            
                // Display feedback for the question (correct/incorrect)
                checkAnswer(); // You can call your checkAnswer function here
            
                // Move to the next question or end the quiz
                nextButton.style.display = "block";
            
            
            // Display feedback for the question (correct/incorrect)
            // Update user score
            // Move to the next question or end the quiz
        }
    }, 1000);
}