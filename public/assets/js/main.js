'use strict';

var cardsArray = [{
  'name': 'shell',
  'img': 'assets/img/blueshell.png'
}, {
  'name': 'star',
  'img': 'assets/img/star.png'
}, {
  'name': 'mario',
  'img': 'assets/img/mario.png'
}, {
  'name': 'luigi',
  'img': 'assets/img/luigi.png'
}, {
  'name': 'peach',
  'img': 'assets/img/peach.png'
}, {
  'name': '1up',
  'img': 'assets/img/1up.png'
}, {
  'name': 'mushroom',
  'img': 'assets/img/mushroom.png'
}, {
  'name': 'bulletbill',
  'img': 'assets/img/bulletbill.png'
}, {
  'name': 'coin',
  'img': 'assets/img/coin.png'
}];

var gameGrid = cardsArray.concat(cardsArray).sort(function () {
  return 0.5 - Math.random();
});



var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
var delay = 600;
var totalGuesses = 0;
var matches = 0;

var game = document.getElementById('game');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(function (item) {
  var name = item.name,
      img = item.img;

  var card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  var front = document.createElement('div');
  front.classList.add('front');

  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = 'url(' + img + ')';

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

var match = function match() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.add('match');
  });
};

var resetGuesses = function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', function (event) {

  var clicked = event.target;

  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        matches++;
        setTimeout(match, delay);
      }
      totalGuesses++;
      setTimeout(resetGuesses, delay);
      console.log("matches: " + matches);
      console.log("total guesses: " + totalGuesses);
    }
    previousTarget = clicked;
  }

  updateScore();
  updateAccuracy();
});

// -----------------------
// Update score on screen
// -----------------------
function updateScore() {
  document.getElementById("matches").innerHTML = "Matches:<br/>" + matches;
}

function updateAccuracy() {
  if (totalGuesses == 0) {
    document.getElementById("accuracy").innerHTML = "Accuracy:<br/>0%";
  }
  else {
    document.getElementById("accuracy").innerHTML = "Accuracy:<br/>" + (matches/totalGuesses * 100).toFixed(1) + "%";
  }
}

// 
// Timer
// 
var timer; 
var timeLeft = 30;

function updateTimer() {
  timeLeft = timeLeft - 1;
  if(timeLeft >= 0)
    document.getElementById("time").innerHTML = timeLeft;
  else {
    gameOver();
    console.log("hit")
  }
}


// The button has an on-click event handler that calls this
function start() {
  timer = setInterval(updateTimer, 1000);
  updateTimer();
}

const firebaseConfig = {
  apiKey: "AIzaSyCty60HL2t5UVK_bxpTKJYe7Qr2S9p9xjk",
  authDomain: "isc-mathcing-game.firebaseapp.com",
  databaseURL: "https://isc-mathcing-game-default-rtdb.firebaseio.com",
  projectId: "isc-mathcing-game",
  storageBucket: "isc-mathcing-game.appspot.com",
  messagingSenderId: "414403306402",
  appId: "1:414403306402:web:f6dcf1e33a383a065f48fb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function gameOver() {
  // This cancels the setInterval, so the updateTimer stops getting called
  clearInterval(timer);
  //Redirect to results page
  const dateAndTime = new Date()
 
  var em = {
      score: "" + matches,
      accuracy: "" + (matches/totalGuesses * 100).toFixed(1),
      date: dateAndTime.toLocaleString()
  };

  firebase.database().ref("Score").push(em).then((snapshot) => {
      location.href = "results.html";

  }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message; 
      window.alert(errorMessage)
      location.href = "results.html";

  });

  
}