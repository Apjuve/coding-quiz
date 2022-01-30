const questions = [

    {
       number: 0,
       title: "Q. In HTML which tag indicates the begining of a new paragraph? ",
       answer: '<p>',
       choices: [
           '<a>',
           '<nav>',
           '<br>',
           '<p>'
       ]
    },

    {
        number: 1,
        title: "Q. In HTML sheet which tag comes after <html>?",
        answer: '<head>',
        choices: [
            '<a>',
            '<br>',
            '<head>',
            '<p>',
        ]
    },

    {
        number: 2,
        title: "Q. With what tag do you insert javascript into a web page?",
        answer: '<script>',
        choices:[
            '<html>',
            '<address>',
            '<script>',
            '<body>'

        ]
    },

    {
        number: 3,
        title: "Q. Where do you put the JavaScript tag on the html sheet?",
        answer: 'body',
        choices:[
            'body',
            'head',
            'paragraph',
            'section',
        ]

    },

    {
        number: 4,
        title: "Q. What are variables?",
        answer: 'containers',
        choices:[
            'containers',
            'sections',
            'captions',
            'forms',

        ]
    }

]


const quizContainer  = document.getElementById('quiz');
const resultsCotainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const timer = document.getElementById('time');
let quizTime = 60;


function startTimer() {
    var timeSet = setInterval(function(){
        quizTime--;
        timer.textContent = quizTime;
        if(quizTime <= 0) {
            clearInterval(timeSet)
        }

    },1000);
}

submitButton.addEventListener('click', function(){
    startTimer()
})


function buildQuiz(){
// variable to store the html output //
const output = [];

// for each question ...//
questions.forEach(
    (currentQuestion, questionNumber)=> {
       
     const  answer = [];
     
    //  and for each available answer //
     for(letter in currentQuestion.answer){

        // add an html radio button //
        answer.push(
            `<label>
                <input type='radio' name='question${questionNumber}' value='${letter}'>
                 ${letter} :
                 ${currentQuestion.answer['<p>']}  
            </label>`
        );
    }
    // add this question and its answer to thhe output
    output.push(
        `<div class='question'> ${currentQuestion.question} </div>
        <div class='answer'> ${answer.join('')} </div>`
    );
    }
);
// finlly conbine our output list into one string of html and out it on the page
quizContainer.innerHTML = output.join('');
}

questions.forEach( (currentQuestion, questionNumber) => {

});

// we want to store the lisit answer choice
const answer = [];

for(answer in currentQuestion.answer){

    // adds aan html radio button 
    answer.push(
        `<label>
            <input type='radio' name='question${questionNumber}' value='${answer}'>
            ${answer} :
            ${currentQuestion.answers[answer]}
        </label>`
    );
}

// add this question to its aanswer to the output
output.push(
    `<div class='question'> ${currentQuestion.question} </div>`
    `<div class='answers'> ${answers.join('')} </div>`
)





function showResults(){}

// display quiz //
buildQuiz();

// On submit, show results //
submitButton.addEventListener('click', showResults);

