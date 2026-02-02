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
            alert("Время вышло! Результат: " + points);
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
        // Эффект "пульсации" при клике
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => btn.style.transform = 'scale(1)', 50);
    }
};

function saveRecord(p) {
    const best = localStorage.getItem('clickRecord') || 0;
    if (p > parseInt(best)) {
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
}

// 2. ГЕНЕРАТОР
function genAdventure() {
    const heros = ['Рыцарь смерти', 'Призрачный маг', 'Ночной вор', 'Тень'];
    const places = ['в бездне', 'в заброшенной цитадели', 'в мертвом городе'];
    const bosses = ['демоном', 'древним богом', 'лордом вампиров'];
    
    const h = heros[Math.floor(Math.random()*heros.length)];
    const p = places[Math.floor(Math.random()*places.length)];
    const b = bosses[Math.floor(Math.random()*bosses.length)];
    
    const story = `${h} проснулся ${p} и вступил в бой с ${b}.`;
    document.getElementById('adv-out').innerText = story;

    let log = JSON.parse(localStorage.getItem('advHistory') || '[]');
    log.unshift(story);
    log = log.slice(0, 3);
    localStorage.setItem('advHistory', JSON.stringify(log));
    
    document.getElementById('adv-history').innerHTML = log.map(i => `<li>• ${i}</li>`).join('');
}

// 3. УГАДАЙ ЧИСЛО
let secret, attempts;
function startGuess() {
    secret = Math.floor(Math.random()*100)+1;
    attempts = 10;
    document.getElementById('guess-att').innerText = attempts;
    document.getElementById('guess-msg').innerText = '';
    document.getElementById('guess-restart').style.display = 'none';
    document.getElementById('guess-in').value = '';
}

function checkGuess() {
    const val = parseInt(document.getElementById('guess-in').value);
    const msg = document.getElementById('guess-msg');
    if (isNaN(val)) return;

    attempts--;
    document.getElementById('guess-att').innerText = attempts;

    if (val === secret) {
        msg.innerText = "Победа! Ты чувствуешь код!";
        msg.style.color = "#4ade80";
        document.getElementById('guess-restart').style.display = 'block';
    } else if (attempts <= 0) {
        msg.innerText = "Система заблокирована. Было: " + secret;
        msg.style.color = "#f87171";
        document.getElementById('guess-restart').style.display = 'block';
    } else {
        msg.innerText = val > secret ? "Бери ниже..." : "Бери выше...";
        msg.style.color = "#fbbf24";
    }
}
startGuess();
