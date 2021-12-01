var timer; 
var timeLeft = 30;

function gameOver() {
  // This cancels the setInterval, so the updateTimer stops getting called
  cancelInterval(timer);
  // Send score to the database
  console.log(score);
}

function updateTimer() {
  timeLeft = timeLeft - 1;
  if(timeLeft >= 0)
    document.getElementById("time").innerHTML = timeLeft;
  else {
    gameOver();
  }
}

// The button has an on-click event handler that calls this
function start() {
  timer = setInterval(updateTimer, 1000);
  console.log("start");
  updateTimer();
}