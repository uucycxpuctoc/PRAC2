// Переключение вкладок
function showGame(id) {
    document.querySelectorAll('.game-card').forEach(card => card.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// 1. КЛИКЕР
let points = 0, seconds = 30, timer = null, isRunning = false;
const btn = document.getElementById('click-btn');
const recordDisplay = document.getElementById('record');

recordDisplay.innerText = localStorage.getItem('clickRecord') || 0;

function startClicker() {
    isRunning = true;
    timer = setInterval(() => {
        seconds--;
        document.getElementById('time').innerText = seconds;
        if (seconds <= 0) {
            clearInterval(timer);
            isRunning = false;
            alert("⏰ Время вышло! Результат: " + points);
            saveRecord(points);
            btn.disabled = true;
        }
    }, 1000);
}

btn.onclick = () => {
    if (!isRunning && seconds === 30) startClicker();
    if (seconds > 0) {
        points++;
        document.getElementById('score').innerText = points;
        btn.style.transform = `scale(${0.95 + Math.random() * 0.1})`;
        btn.style.filter = `hue-rotate(${points * 10}deg)`;
    }
};

function saveRecord(p) {
    const best = localStorage.getItem('clickRecord') || 0;
    if (p > best) {
        localStorage.setItem('clickRecord', p);
        recordDisplay.innerText = p;
    }
}

function resetClicker() {
    clearInterval(timer);
    points = 0; seconds = 30; isRunning = false;
    document.getElementById('score').innerText = 0;
    document.getElementById('time').innerText = 30;
    btn.disabled = false;
    btn.style.filter = 'none';
}

// 2. ГЕНЕРАТОР ПРИКЛЮЧЕНИЙ
const heros = ['Рыцарь', 'Маг', 'Лесной вор', 'Кибер-панк'];
const places = ['в заброшенном метро', 'в тёмном лесу', 'в облачном городе'];
const bosses = ['драконом', 'злым ИИ', 'древним проклятием'];

function genAdventure() {
    const h = heros[Math.floor(Math.random()*heros.length)];
    const p = places[Math.floor(Math.random()*places.length)];
    const b = bosses[Math.floor(Math.random()*bosses.length)];
    
    const story = `Ваш персонаж — ${h} находится ${p} и сражается с ${b}.`;
    document.getElementById('adv-out').innerText = story;

    // Сохранение истории
    let log = JSON.parse(localStorage.getItem('advHistory') || '[]');
    log.unshift(story);
    log = log.slice(0, 3);
    localStorage.setItem('advHistory', JSON.stringify(log));
    
    const list = document.getElementById('adv-history');
    list.innerHTML = log.map(item => `<li>${item}</li>`).join('');
}

// 3. УГАДАЙ ЧИСЛО
let secret, attempts;
function startGuess() {
    secret = Math.floor(Math.random()*100)+1;
    attempts = 10;
    document.getElementById('guess-att').innerText = attempts;
    document.getElementById('guess-msg').innerText = '';
    document.getElementById('guess-restart').style.display = 'none';
}

function checkGuess() {
    const val = parseInt(document.getElementById('guess-in').value);
    const msg = document.getElementById('guess-msg');
    if (isNaN(val)) return;

    attempts--;
    document.getElementById('guess-att').innerText = attempts;

    if (val === secret) {
        msg.innerText = "🏆 Победа! Число угадано!";
        msg.style.color = "#10b981";
        document.getElementById('guess-restart').style.display = 'block';
    } else if (attempts <= 0) {
        msg.innerText = "💀 Попытки кончились! Это было " + secret;
        msg.style.color = "#ef4444";
        document.getElementById('guess-restart').style.display = 'block';
    } else {
        msg.innerText = val > secret ? "Надо меньше..." : "Надо больше...";
        msg.style.color = "#f59e0b";
    }
}
startGuess();
