// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getDatabase, ref, onChildAdded } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAcl8dW_yCIjjnmHlZBXl0qUW8xl5NsNpA",
    authDomain: "quiz-app-with-firebase-e11e9.firebaseapp.com",
    projectId: "quiz-app-with-firebase-e11e9",
    storageBucket: "quiz-app-with-firebase-e11e9.appspot.com",
    messagingSenderId: "296453952006",
    appId: "1:296453952006:web:1b0351dcd08c92732de987",
    measurementId: "G-YBDWNQB3ZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const DATABASE = getDatabase();

// ---------Question Array
var questions = []

// ----------Variable Gets
var currentQuestion = document.getElementById('currentQuestion');
var totalQuestion = document.getElementById('totalQuestion');
var question = document.getElementById('question');
var answerParent = document.getElementById('answerParent');
var loader = document.getElementById('loader');
var showQuestion = document.getElementById('showQuestion');

var indexNum = 0;
var score = 0;

// -----------------Get Data From Database Function
function getDataFromDatabase() {
    loader.style.display = 'block';
    showQuestion.style.display = 'none';
    var reference = ref(DATABASE, 'Questions/question/');
    onChildAdded(reference, function (data) {
        // console.log(data.val());
        questions.push(data.val())
        loader.style.display = 'none';
        showQuestion.style.display = 'block';
        renderQuestion()
    })

}
getDataFromDatabase()


// ---------------------check Question Function

window.checkQuestion = function (a, b) {
    if (a == b) {
        score++;
        // console.log(score);
    }
    nextQuestion()
}

// --------------------next Question Function

window.nextQuestion = function () {
    if (indexNum + 1 == questions.length) {
        alert(" Your Score is " + score);
        // Swal.fire('Your Score is ' + score)
        location.replace("result.html")
    } else {
        indexNum++;
        
        renderQuestion();
    }
}


// --------------------Render Question Function

function renderQuestion() {
    currentQuestion.innerHTML = indexNum + 1;
    totalQuestion.innerHTML = questions.length;
    var obj = questions[indexNum];
    question.innerHTML = obj.question
    answerParent.innerHTML = '';
    for (var i = 0; i < obj.Options.length; i++) {
        answerParent.innerHTML += `
        <div  style="cursor: pointer;" class="alert alert-info" id="option_a" role="alert"  onclick="checkQuestion('${obj.Options[i]}','${obj.correctAnswer}')">
        ${obj.Options[i]}
                    </div>
     `
    }
}

renderQuestion();

