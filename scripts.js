let questions = [];  

function updateQuestionType() {  
    const questionType = document.getElementById('questionType').value;  
    const optionsContainer = document.getElementById('optionsContainer');  
    
    optionsContainer.innerHTML = '';  
    
    if (questionType === 'multiple-choice') {  
        for (let i = 1; i <= 4; i++) {  
            optionsContainer.innerHTML += `  
                <div class="form-group">  
                    <label for="option${i}">Option ${i}:</label>  
                    <input type="text" class="form-control" id="option${i}" required>  
                    <div class="form-check">  
                        <input type="radio" class="form-check-input" name="correctOption" id="correctOption${i}" value="option${i}">  
                        <label class="form-check-label" for="correctOption${i}">Correct Option</label>  
                    </div>  
                </div>  
            `;  
        }  
    } else if (questionType === 'true-false') {  
        optionsContainer.innerHTML = `  
            <div class="form-group">  
                <label for="option1">True</label>  
                <div class="form-check">  
                    <input type="radio" class="form-check-input" name="correctOption" id="correctOptionTrue" value="true">  
                    <label class="form-check-label" for="correctOptionTrue">Correct Option</label>  
                </div>  
            </div>  
            <div class="form-group">  
                <label for="option2">False</label>  
                <div class="form-check">  
                    <input type="radio" class="form-check-input" name="correctOption" id="correctOptionFalse" value="false">  
                    <label class="form-check-label" for="correctOptionFalse">Correct Option</label>  
                </div>  
            </div>  
        `;  
    }  
}  

function addQuestion() {  
    const questionText = document.getElementById('question').value;  
    const correctOption = document.querySelector('input[name="correctOption"]:checked');  
    
    if (!correctOption) {  
        alert("Please select a correct option.");  
        return;  
    }  

    const options = [];  
    for (let i = 1; i <= 4; i++) {  
        const optionValue = document.getElementById(`option${i}`).value;  
        if (optionValue) {  
            options.push(optionValue);  
        }  
    }  

    questions.push({  
        question: questionText,  
        options: options,  
        answer: correctOption.value,  
    });  

    document.getElementById('quizForm').reset();  
    updateQuestionType();  
    renderQuiz();  
}  

function renderQuiz() {  
    const quizForm = document.getElementById('quiz');  
    quizForm.innerHTML = '';  

    questions.forEach((q, index) => {  
        quizForm.innerHTML += `  
            <div class="form-group">  
                <label>${index + 1}. ${q.question}</label>  
                ${q.options.map((option, idx) => `  
                    <div class="form-check">  
                        <input class="form-check-input" type="radio" name="question${index}" id="question${index}Option${idx}" value="${option}" required>  
                        <label class="form-check-label" for="question${index}Option${idx}">${option}</label>  
                    </div>`  
                ).join('')}  
            </div>  
        `;  
    });  
}  

function submitQuiz() {  
    let score = 0;  

    questions.forEach((q, index) => {  
        const userAnswer = document.querySelector(`input[name="question${index}"]:checked`);  
        if (userAnswer && userAnswer.value === q.answer) {  
            score++;  
        }  
    });  

    document.getElementById('scoreDisplay').textContent = `Your score: ${score} out of ${questions.length}`;  
}  
