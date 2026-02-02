// --- ЛОГИКА МЕНЮ ---
const menuBtn = document.getElementById('menuBtn');
const gameMenu = document.getElementById('gameMenu');

menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    gameMenu.classList.toggle('show');
});

document.addEventListener('click', () => {
    gameMenu.classList.remove('show');
});

function selectGame(id) {
    document.querySelectorAll('.game-card').forEach(c => c.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    gameMenu.classList.remove('show');
}

// --- КЛИКЕР ---
let pts = 0, sec = 30, timer = null, active = false;
const clickBtn = document.getElementById('click-btn');
document.getElementById('record').innerText = localStorage.getItem('bestClick') || 0;

clickBtn.onclick = () => {
    if (!active && sec === 30) {
        active = true;
        timer = setInterval(() => {
            sec--; 
            document.getElementById('time').innerText = sec;
            if (sec <= 0) {
                clearInterval(timer); active = false;
                alert("Время вышло! Ваш результат: " + pts);
                if (pts > (localStorage.getItem('bestClick') || 0)) {
                    localStorage.setItem('bestClick', pts);
                    document.getElementById('record').innerText = pts;
                }
                clickBtn.disabled = true;
            }
        }, 1000);
    }
    if (sec > 0) {
        pts++; 
        document.getElementById('score').innerText = pts;
        clickBtn.style.transform = 'scale(0.96)';
        setTimeout(() => clickBtn.style.transform = 'scale(1)', 50);
    }
};

function resetClicker() {
    clearInterval(timer); pts = 0; sec = 30; active = false;
    document.getElementById('score').innerText = 0;
    document.getElementById('time').innerText = 30;
    clickBtn.disabled = false;
}

// --- ГЕНЕРАТОР ---
function genAdventure() {
    const heros = ['Кибер-рыцарь', 'Маг пустоты', 'Тёмный хакер'];
    const places = ['в цифровом лесу', 'в неоновом гетто', 'в ядре процессора'];
    const enemies = ['вирусом', 'глюком системы', 'лордом данных'];
    
    const res = `${heros[Math.floor(Math.random()*3)]} находится ${places[Math.floor(Math.random()*3)]} и сражается с ${enemies[Math.floor(Math.random()*3)]}.`;
    document.getElementById('adv-out').innerText = res;
}

// --- УГАДАЙ ЧИСЛО ---
let target = Math.floor(Math.random()*100)+1, att = 10;
function checkGuess() {
    const val = parseInt(document.getElementById('guess-in').value);
    if (isNaN(val)) return;
    att--; 
    document.getElementById('guess-att').innerText = att;
    const msg = document.getElementById('guess-msg');
    
    if (val === target) {
        msg.innerText = "Успех! Число угадано.";
        msg.style.color = "#4ade80";
        document.getElementById('guess-restart').style.display = 'inline-block';
    } else if (att <= 0) {
        msg.innerText = "Провал. Это было число: " + target;
        msg.style.color = "#f87171";
        document.getElementById('guess-restart').style.display = 'inline-block';
    } else {
        msg.innerText = val > target ? "Надо меньше..." : "Надо больше...";
        msg.style.color = "#fbbf24";
    }
}
