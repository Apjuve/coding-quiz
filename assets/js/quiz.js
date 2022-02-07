var questions = [

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

];

var startHighscores = document.querySelector('#start-highscores');
var quizHighscore = document.querySelector('#quiz-highscores');
var timerDiv = document.querySelector(".timer-textbox");
var timeCount = document.querySelector(".timer-count");
var startDiv = document.querySelector(".start-div");
var submit =  document.querySelector('#submit');
var quizTextbox = document.querySelector('.quiz-textbox');
var questionsTextbox = document.querySelector("#questionBox");
var choicesA = document.querySelector('#choicesA');
var choicesB = document.querySelector('#choicesB');
var choicesC = document.querySelector('#choicesC');
var choicesD = document.querySelector('#choicesD');
var reviewChoice = document.querySelector('#reviewChoice');
var form = document.querySelector('#form');
var scoreText = document.querySelector('#scoreText');
var initials = document.querySelector('#initials');
var submitButton = document.querySelector("#submit-button");
var messageBox = document.querySelector('.submit-message');
var highscores = document.querySelector('#highscores');
var back = document.querySelector('#back');
var clear = document.querySelector('#clear');
var highscoreSection = document.querySelector('#highscores-section');
var clearText = document.querySelector('#clearText');


var questionsIndex = 0;
var numberCorrect = 0;
var quizTime = 75;

// function that assign each button
function renderquestions() {
    questionsTextbox.textContent = questions[questionsIndex].title;
    choicesA.textContent = questions[questionsIndex].choices[0];
    choicesB.textContent = questions[questionsIndex].choices[1];
    choicesC.textContent = questions[questionsIndex].choices[2];
    choicesD.textContent = questions[questionsIndex].choices[3];
    
}

// function to check answer and deduct time if incorrect

function checkChoice (choice) {

    if(questions[questionsIndex].answer === questions[questionsIndex].choices[choice]) {
        reviewChoice.textContent = 'Very Good'
        numberCorrect++
    }else {
        quizTime -= 10;
        timeCount.textContent=quizTime;
        reviewChoice.textContent = `Incorrect choice, right answer is ${questions[questionsIndex].answer}`;
        
    }

    questionsIndex++

    if(questionsIndex < questions.length) {
        renderquestions();
    }else {
        endGame();
    }
}

// set of funnctions that incorrporates the checkChoice function
function optionA () { checkChoice(0); }
function optionB () { checkChoice(1); }
function optionC () { checkChoice(2); }
function optionD () { checkChoice(3); }

// each individual button is assigned its own function on click which also triggers the checkChoice function
choicesA.addEventListener('click',optionA);
choicesB.addEventListener('click',optionB);
choicesC.addEventListener('click',optionC);
choicesD.addEventListener('click',optionD);


function startQuiz() {
    var timeSet = setInterval(function(){
        quizTime--;
        timeCount.textContent = quizTime;
        if(quizTime <= 0) {
            clearInterval(timeSet);
            if(questionsIndex < questions.length -1) {
                endGame();
            }
        }
        console.log();
    },1000);
    


startHighscores.style.display = 'none';
startDiv.style.display = 'none';
quizTextbox.style.display = 'block';
choicesA.style.display = 'block';
choicesB.style.display = 'block';
choicesC.style.display = 'block';
choicesD.style.display = 'block';
header.style.display = '1';
renderquestions();

}

// function for endgame and display final score
function endGame () {
    header.style.opacity = '0';
    quizTextbox.style.display = 'none';
    form.style.display = 'block';
    scoreText.textContent = `Final Score ${numberCorrect}`;
}

submit.addEventListener('click', startQuiz);

function displayMessage (type, message) {
    messageBox.textContent = message;
    messageBox.setAttribute('class',type);
    console.log();
}


// function to store scores and initial in an array and stringfield
function storeScores (event) {
    event.preventDefault();

    if(initials.value === '') {
        displayMessage('error', 'Please, enter initials to contiue');
        return;
    }

    form.style.display = 'none';
    highscores.style.display = 'block';

    var savedScores = localStorage.getItem('highscores');
    var scoreArray;

    if (savedScores === null) {
        scoreArray =[];
    }else {
        scoreArray = JSON.parse(savedScores);
    }

    var savedScores = {
        initials: initials.value,
        score: numberCorrect
    };

    scoreArray.push(savedScores);

    scoreArrayString = JSON.stringify(scoreArray);
    localStorage.setItem('highscores', scoreArrayString);

    getScore();
};

var i = 0;

function getScore () {
    savedScores = localStorage.getItem('highscores');

    if(savedScores === null) {
        return;
    }

    var storedScores = JSON.parse(savedScores);

    for (; i < storedScores.length; i++) {
        var newScore = document.createElement('p');
        newScore.textContent = `${storedScores[i].initials}: ${storedScores[i].score}`;
        highscoreSection.appendChild(newScore);
    }

}

submitButton.addEventListener('click', function(event) {
    storeScores(event);
});

back.addEventListener('click', function(){
    highscores.style.display = 'none';
    startDiv.style.display = 'block';
    window.location.reload();
})

clear.addEventListener('click',function() {
    window.localStorage.removeItem('highscores');
    clearText.style.display = 'block';
    highscoreSection.innerHTML = '';
})

startHighscores.addEventListener('click',function() {
    getScore();
    highscores.style.display = 'block';
    startDiv.style.display = 'none';
});

quizHighscore.addEventListener('click',function() {
    getScore();
    highscores.style.display = 'block';
    quizTextbox.style.display = 'none';
    timerDiv.style.display = 'none';
});




