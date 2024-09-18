const timer = document.getElementById('timer');
const startStopBtn = document.getElementById('start-stop');
const resetBtn = document.getElementById('reset');
const pomodoroBtn = document.getElementById('pomodoro');
const shortBreakBtn = document.getElementById('short-break');
const longBreakBtn = document.getElementById('long-break');
const tasksBtn = document.getElementById('tasks');
const tasksPopup = document.getElementById('tasks-popup');
const closePopupBtn = document.getElementById('close-popup');
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const clearAllBtn = document.getElementById('clear-all');

const alarmSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');

let interval;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;
let currentMode = 'pomodoro';

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timer.textContent = timerText;
    document.title = `${timerText} - Pomodoro Timer`;
}

function startStop() {
    if (isRunning) {
        stopTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    interval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimer();
        } else {
            clearInterval(interval);
            alarmSound.play();
            timer.textContent = "Time is Up!";
            document.title = "Time is Up! - Pomodoro Timer";
            isRunning = false;
            startStopBtn.querySelector('span').textContent = 'Start';
        }
    }, 1000);
    startStopBtn.querySelector('span').textContent = 'Stop';
    isRunning = true;
}

function stopTimer() {
    clearInterval(interval);
    startStopBtn.querySelector('span').textContent = 'Start';
    isRunning = false;
}

function reset() {
    stopTimer();
    setMode(currentMode);
    updateTimer(); // Add this line to ensure the timer display is updated
}

function setMode(mode) {
    if (isRunning) {
        stopTimer();
    }
    currentMode = mode;
    switch (mode) {
        case 'pomodoro':
            timeLeft = 25 * 60;
            break;
        case 'short-break':
            timeLeft = 5 * 60;
            break;
        case 'long-break':
            timeLeft = 15 * 60;
            break;
    }
    updateTimer();
    document.querySelectorAll('.mode-buttons button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(mode).classList.add('active');
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
pomodoroBtn.addEventListener('click', () => setMode('pomodoro'));
shortBreakBtn.addEventListener('click', () => setMode('short-break'));
longBreakBtn.addEventListener('click', () => setMode('long-break'));
tasksBtn.addEventListener('click', () => {
    tasksPopup.style.display = 'block';
});

// Add this new event listener
tasksPopup.addEventListener('click', (e) => {
    if (e.target === tasksPopup) {
        tasksPopup.style.display = 'none';
    }
});

closePopupBtn.addEventListener('click', () => {
    tasksPopup.style.display = 'none';
});

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `task-${Date.now()}`;
        
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = taskText;
        
        li.appendChild(checkbox);
        li.appendChild(label);
        taskList.appendChild(li);
        taskInput.value = '';
    }
}

function clearAllTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}

clearAllBtn.addEventListener('click', clearAllTasks);

updateTimer();