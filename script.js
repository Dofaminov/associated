document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const wordDisplay = document.getElementById("wordDisplay");
  const timerDisplay = document.getElementById("timer");
  const endMessage = document.getElementById("endMessage");
  const speedInputs = document.querySelectorAll('input[name="speed"]');
  let words = [];
  let interval;
  let timeLeft = 90;

  // Загрузка слов из файла words.txt
  fetch("words.txt")
    .then((response) => response.text())
    .then((data) => {
      words = data.split("\n").filter((word) => word.trim() !== "");
    })
    .catch((error) => console.error("Ошибка загрузки файла:", error));

  // Функция для получения случайного слова
  function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  // Функция для запуска игры
  function startGame() {
    const selectedSpeed = document.querySelector('input[name="speed"]:checked').value;
    startButton.disabled = true;
    startButton.textContent = timeLeft;
    startButton.style.backgroundColor = "#fa8072"; // Лососевый цвет

    // Показываем первое слово сразу
    wordDisplay.textContent = getRandomWord();

    // Запускаем интервал для следующих слов
    interval = setInterval(() => {
      wordDisplay.textContent = getRandomWord();
    }, selectedSpeed);

    // Запускаем таймер
    const timerInterval = setInterval(() => {
      timeLeft--;
      startButton.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(interval);
        clearInterval(timerInterval);
        wordDisplay.textContent = "";
        endMessage.textContent = "Это было круто!";
        startButton.disabled = false;
        startButton.textContent = "Поехали!";
        startButton.style.backgroundColor = "#8fbc8f"; // Зеленый цвет
        timeLeft = 90;
      }
    }, 1000);
  }

  // Обработчик нажатия на кнопку
  startButton.addEventListener("click", startGame);
});