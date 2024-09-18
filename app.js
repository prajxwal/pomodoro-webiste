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

let alarmSound = new Audio();
let testSound = null;

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
            alarmSound.play().catch(error => console.error('Error playing alarm:', error));
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
            timeLeft = pomodoroTimeInput.value * 60;
            break;
        case 'short-break':
            timeLeft = shortBreakTimeInput.value * 60;
            break;
        case 'long-break':
            timeLeft = longBreakTimeInput.value * 60;
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

// Add settings button and popup functionality
const settingsBtn = document.getElementById('settings-btn');
const settingsPopup = document.getElementById('settings-popup');
const closeSettingsPopupBtn = document.getElementById('close-settings-popup');
const settingsMenuBtns = document.querySelectorAll('.settings-menu-btn');
const settingsContentSections = document.querySelectorAll('.settings-content-section');

settingsBtn.addEventListener('click', () => {
    settingsPopup.style.display = 'block';
});

closeSettingsPopupBtn.addEventListener('click', () => {
    settingsPopup.style.display = 'none';
    if (testSound) {
        testSound.pause();
        testSound.currentTime = 0;
    }
});

settingsPopup.addEventListener('click', (e) => {
    if (e.target === settingsPopup) {
        settingsPopup.style.display = 'none';
        if (testSound) {
            testSound.pause();
            testSound.currentTime = 0;
        }
    }
});

settingsMenuBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        settingsMenuBtns.forEach(b => b.classList.remove('active'));
        settingsContentSections.forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
        settingsContentSections[index].classList.add('active');
    });
});

// Add these new variables
const pomodoroTimeInput = document.getElementById('pomodoro-time');
const shortBreakTimeInput = document.getElementById('short-break-time');
const longBreakTimeInput = document.getElementById('long-break-time');
const alarmSoundSelect = document.getElementById('alarm-sound');
const testSoundBtn = document.getElementById('test-sound-btn');

// Update the setMode function to use the custom times
function setMode(mode) {
    if (isRunning) {
        stopTimer();
    }
    currentMode = mode;
    switch (mode) {
        case 'pomodoro':
            timeLeft = pomodoroTimeInput.value * 60;
            break;
        case 'short-break':
            timeLeft = shortBreakTimeInput.value * 60;
            break;
        case 'long-break':
            timeLeft = longBreakTimeInput.value * 60;
            break;
    }
    updateTimer();
    document.querySelectorAll('.mode-buttons button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(mode).classList.add('active');
}

// Add event listeners for timer inputs
pomodoroTimeInput.addEventListener('change', () => {
    if (currentMode === 'pomodoro') setMode('pomodoro');
});
shortBreakTimeInput.addEventListener('change', () => {
    if (currentMode === 'short-break') setMode('short-break');
});
longBreakTimeInput.addEventListener('change', () => {
    if (currentMode === 'long-break') setMode('long-break');
});

// Update alarm sound when changed
alarmSoundSelect.addEventListener('change', () => {
    setAlarmSound(alarmSoundSelect.value);
});

// Test sound button
testSoundBtn.addEventListener('click', () => {
    if (testSound && !testSound.paused) {
        testSound.pause();
        testSound.currentTime = 0;
    } else {
        playPreviewSound(alarmSoundSelect.value);
    }
});

// Update the startTimer function
function startTimer() {
    interval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimer();
        } else {
            clearInterval(interval);
            alarmSound.play().catch(error => console.error('Error playing alarm:', error));
            timer.textContent = "Time is Up!";
            document.title = "Time is Up! - Pomodoro Timer";
            isRunning = false;
            startStopBtn.querySelector('span').textContent = 'Start';
        }
    }, 1000);
    startStopBtn.querySelector('span').textContent = 'Stop';
    isRunning = true;
}

// Update the setAlarmSound function
function setAlarmSound(url) {
    alarmSound.src = url;
    alarmSound.load();
    // Play a short preview of the new sound
    playPreviewSound(url);
}

// Add this new function to play a preview of the sound
function playPreviewSound(url) {
    if (testSound) {
        testSound.pause();
        testSound.currentTime = 0;
    }
    testSound = new Audio(url);
    testSound.load();
    testSound.play().catch(error => console.error('Error playing preview sound:', error));
}

// Update the close settings popup button event listener
closeSettingsPopupBtn.addEventListener('click', () => {
    settingsPopup.style.display = 'none';
    if (testSound) {
        testSound.pause();
        testSound.currentTime = 0;
    }
});

// Update the settings popup click event listener
settingsPopup.addEventListener('click', (e) => {
    if (e.target === settingsPopup) {
        settingsPopup.style.display = 'none';
        if (testSound) {
            testSound.pause();
            testSound.currentTime = 0;
        }
    }
});

// Add this line at the end of your script to set the initial alarm sound
setAlarmSound(alarmSoundSelect.value);