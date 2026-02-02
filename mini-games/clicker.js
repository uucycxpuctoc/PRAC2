<script>
let score = 0;
let timeLeft = 30;
let timer = null;
let isPlaying = false;

const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const messageEl = document.getElementById("message");
const bestScoreEl = document.getElementById("bestScore");

const clickBtn = document.getElementById("clickBtn");
const resetBtn = document.getElementById("resetBtn");
const startBtn = document.getElementById("startBtn");

// Загрузка рекорда
let bestScore = localStorage.getItem("bestScore") || 0;
bestScoreEl.textContent = bestScore;

// Клик
clickBtn.addEventListener("click", () => {
  if (!isPlaying) return;

  score++;
  scoreEl.textContent = score;

  // визуальный эффект
  clickBtn.style.background = "#fff";
  clickBtn.style.color = "#000";
  setTimeout(() => {
    clickBtn.style.background = "#000";
    clickBtn.style.color = "#fff";
  }, 100);
});

// Старт игры
startBtn.addEventListener("click", () => {
  if (isPlaying) return;

  score = 0;
  timeLeft = 30;
  isPlaying = true;
  messageEl.textContent = "";
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
});

// Сброс
resetBtn.addEventListener("click", () => {
  score = 0;
  scoreEl.textContent = score;
});

// Конец игры
function endGame() {
  clearInterval(timer);
  isPlaying = false;
  messageEl.textContent = `⏱ Игра окончена! Очки: ${score}`;

  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("bestScore", bestScore);
    bestScoreEl.textContent = bestScore;
    messageEl.textContent += " 🏆 Новый рекорд!";
  }
}
</script>
