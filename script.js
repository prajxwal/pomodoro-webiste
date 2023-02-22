const pomodoroButton = document.getElementById("pomodoroButton");
const shortBreakButton = document.getElementById("shortBreakButton");
const longBreakButton = document.getElementById("longBreakButton");
const startPauseButton = document.getElementById("startPauseButton");
const resetButton = document.getElementById("resetButton");
const fullscreenBtn = document.getElementById("fullscreen-btn");
const timerDisplay = document.getElementById("timer");

let isTimerRunning = false;
let timerInterval;
let sessionLength = 25 * 60; // in seconds
let activeButton = "pomodoro";

function startTimer(duration) {
  let timer = duration, minutes, seconds;

  
  clearInterval(timerInterval);

  timerInterval = setInterval(function () {
    minutes = Math.floor(timer / 60);
    seconds = Math.floor(timer % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timerDisplay.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      isTimerRunning = false;
      startPauseButton.textContent = "Start";
      resetButton.disabled = true;
      timerDisplay.textContent = "Time's up!";
    }
  }, 1000);
}

function startPauseTimer() {
  if (!isTimerRunning) {
    isTimerRunning = true;
    startTimer(sessionLength);
    startPauseButton.textContent = "Pause";
    resetButton.disabled = false;
  } else {
    clearInterval(timerInterval);
    timerInterval = null;
    isTimerRunning = false;
    startPauseButton.textContent = "Start";
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  startPauseButton.textContent = "Start";
  resetButton.disabled = true;
  timerDisplay.textContent = "25:00";
  isTimerRunning = false;
  sessionLength = 25 * 60;

  if (activeButton === "shortBreak") {
    sessionLength = 5 * 60;
    timerDisplay.textContent = "05:00";
  } else if (activeButton === "longBreak") {
    sessionLength = 15 * 60;
    timerDisplay.textContent = "15:00";
  }
}

pomodoroButton.addEventListener("click", function() {
  activeButton = "pomodoro";
  sessionLength = 25 * 60;
  timerDisplay.textContent = "25:00";
  resetTimer();
});

shortBreakButton.addEventListener("click", function() {
  activeButton = "shortBreak";
  sessionLength = 5 * 60;
  timerDisplay.textContent = "05:00";
  resetTimer();
});

longBreakButton.addEventListener("click", function() {
  activeButton = "longBreak";
  sessionLength = 15 * 60;
  timerDisplay.textContent = "15:00";
  resetTimer();
});

startPauseButton.addEventListener("click", startPauseTimer);

resetButton.addEventListener("click", resetTimer);

fullscreenBtn.addEventListener("click", function() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
});
