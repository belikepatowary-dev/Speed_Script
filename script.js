const textDisplay = document.getElementById("text-display");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart");

let timeLeft = 60;
let timer;
let started = false;

const texts = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing tests improve your speed and accuracy.",
    "Practice makes perfect and consistency is key.",
    "JavaScript makes websites interactive and fun.",
    "GitHub Pages allows you to host websites for free."
];

let currentText = "";

function newText() {
    currentText = texts[Math.floor(Math.random() * texts.length)];
    textDisplay.innerHTML = "";
    currentText.split("").forEach(char => {
        const span = document.createElement("span");
        span.innerText = char;
        textDisplay.appendChild(span);
    });
    inputEl.value = "";
    wpmEl.innerText = 0;
    accuracyEl.innerText = 0;
    timeLeft = 60;
    timeEl.innerText = timeLeft;
    started = false;
}

inputEl.addEventListener("input", () => {
    if (!started) {
        started = true;
        timer = setInterval(updateTime, 1000);
    }

    const textSpans = textDisplay.querySelectorAll("span");
    const input = inputEl.value.split("");
    let correctChars = 0;

    textSpans.forEach((span, i) => {
        if (input[i] == null) {
            span.classList.remove("correct", "incorrect");
        } else if (input[i] === span.innerText) {
            span.classList.add("correct");
            span.classList.remove("incorrect");
            correctChars++;
        } else {
            span.classList.add("incorrect");
            span.classList.remove("correct");
        }
    });

    const wordsTyped = input.join("").split(" ").length;
    const wpm = Math.round((wordsTyped / (60 - timeLeft)) * 60) || 0;
    const accuracy = Math.round((correctChars / input.length) * 100) || 0;

    wpmEl.innerText = wpm;
    accuracyEl.innerText = accuracy;
});

function updateTime() {
    timeLeft--;
    timeEl.innerText = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timer);
        inputEl.disabled = true;
    }
}

restartBtn.addEventListener("click", newText);

// Initialize
newText();
