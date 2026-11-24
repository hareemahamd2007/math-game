
"use strict";

// =====================================
// MATHBlizt - GRADE 8 MENTAL MATHS
// =====================================

const TOTAL_QUESTIONS = 20;
const QUESTION_TIME = 30;

let currentLevel = 1;
let questionIndex = 0;

let score = 0;
let coins = 0;
let streak = 0;
let correctAnswers = 0;
let coinsThisLevel = 0;

let timeLeft = QUESTION_TIME;
let timerInterval = null;
let nextTimeout = null;
let answered = false;
let currentQuestion = null;

const unlockedLevels = new Set([1]);

// =====================================
// HTML ELEMENTS
// =====================================

const welcomeScreen = document.getElementById("welcomeScreen");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");

const playGameBtn = document.getElementById("playGameBtn");
const scoreElement = document.getElementById("score");
const coinsElement = document.getElementById("coins");
const streakElement = document.getElementById("streak");

const levelText = document.getElementById("levelText");
const questionNumber = document.getElementById("questionNumber");
const progressBar = document.getElementById("progressBar");

const timerElement = document.getElementById("timer");
const topicLabel = document.getElementById("topicLabel");
const questionElement = document.getElementById("question");

const answerForm = document.getElementById("answerForm");
const answerInput = document.getElementById("answerInput");
const messageElement = document.getElementById("message");

const nextLevelBtn = document.getElementById("nextLevelBtn");
const retryBtn = document.getElementById("retryBtn");
const homeBtn = document.getElementById("homeBtn");

// =====================================
// HELPER FUNCTIONS
// =====================================

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(items) {
    return items[randomInt(0, items.length - 1)];
}

function makeQuestion(topic, text, answer) {
    return {
        topic,
        text,
        answer: Number(answer)
    };
}

// =====================================
// LEVEL 1 - EASY
// =====================================

function levelOneQuestion() {
    const type = randomInt(1, 8);

    switch (type) {
        case 1: {
            const a = randomInt(20, 150);
            const b = randomInt(10, 90);
            return makeQuestion("Addition", `${a} + ${b} = ?`, a + b);
        }

        case 2: {
            const a = randomInt(50, 200);
            const b = randomInt(10, a - 1);
            return makeQuestion("Subtraction", `${a} - ${b} = ?`, a - b);
        }

        case 3: {
            const a = randomInt(2, 12);
            const b = randomInt(2, 12);
            return makeQuestion("Multiplication", `${a} × ${b} = ?`, a * b);
        }

        case 4: {
            const b = randomInt(2, 12);
            const answer = randomInt(2, 12);
            return makeQuestion("Division", `${b * answer} ÷ ${b} = ?`, answer);
        }

        case 5: {
            const a = randomInt(2, 10);
            const b = randomInt(2, 10);
            return makeQuestion("Squares", `${a}² + ${b} = ?`, a * a + b);
        }

        case 6: {
            const a = randomInt(2, 15);
            return makeQuestion("Square Roots", `√${a * a} + 5 = ?`, a + 5);
        }

        case 7: {
            const a = randomInt(2, 10);
            return makeQuestion("Fractions", `½ of ${a * 2 * 5} = ?`, a * 5);
        }

        default: {
            const a = randomInt(1, 9) * 10;
            return makeQuestion("Percentages", `10% of ${a} = ?`, a / 10);
        }
    }
}

// =====================================
// LEVEL 2 - MEDIUM
// =====================================

function levelTwoQuestion() {
    const type = randomInt(1, 8);

    switch (type) {
        case 1: {
            const a = randomInt(2, 9) * 10;
            return makeQuestion("Percentages", `25% of ${a * 2} = ?`, a / 2);
        }

        case 2: {
            const a = randomInt(2, 9) * 10;
            return makeQuestion("Percentages", `15% of ${a * 2} = ?`, a * 0.3);
        }

        case 3: {
            const a = randomInt(2, 12);
            const b = randomInt(2, 12);
            return makeQuestion("Algebra", `If x = ${a}, find 3x + ${b}`, 3 * a + b);
        }

        case 4: {
            const answer = randomInt(5, 30);
            const b = randomInt(2, 15);
            return makeQuestion("Linear Equations", `${answer} + ${b} = ?`, answer + b);
        }

        case 5: {
            const a = randomInt(3, 15);
            return makeQuestion("Squares", `${a}² = ?`, a * a);
        }

        case 6: {
            const a = randomInt(2, 12);
            return makeQuestion("Square Roots", `√${a * a} × 3 = ?`, a * 3);
        }

        case 7: {
            const a = randomInt(2, 9);
            const b = randomInt(2, 9);
            return makeQuestion("Ratios", `Ratio ${a}:${b}. If first part is ${a * 3}, what is the second?`, b * 3);
        }

        default: {
            const a = randomInt(2, 10);
            const b = randomInt(2, 10);
            return makeQuestion("Decimals", `${a}.5 + ${b}.5 = ?`, a + b + 1);
        }
    }
}

// =====================================
// LEVEL 3 - HARD
// =====================================

function levelThreeQuestion() {
    const type = randomInt(1, 9);

    switch (type) {
        case 1: {
            const a = randomInt(2, 12);
            const b = randomInt(2, 12);
            const c = randomInt(2, 12);
            return makeQuestion(
                "BODMAS",
                `${a} + ${b} × ${c} = ?`,
                a + b * c
            );
        }

        case 2: {
            const a = randomInt(2, 10);
            const b = randomInt(2, 10);
            return makeQuestion(
                "BODMAS",
                `(${a} + ${b}) × 3 = ?`,
                (a + b) * 3
            );
        }

        case 3: {
            const a = randomInt(10, 80);
            return makeQuestion(
                "Percentages",
                `20% of ${a * 5} = ?`,
                a
            );
        }

        case 4: {
            const a = randomInt(3, 15);
            return makeQuestion(
                "Powers",
                `${a}² - ${a} = ?`,
                a * a - a
            );
        }

        case 5: {
            const a = randomInt(2, 12);
            const b = randomInt(2, 12);
            return makeQuestion(
                "Fractions",
                `½ of ${a * b * 2} + ${b} = ?`,
                a * b + b
            );
        }

        case 6: {
            const a = randomInt(2, 10);
            const b = randomInt(2, 10);
            return makeQuestion(
                "Algebra",
                `If x = ${a}, find 4x + ${b * 2}`,
                4 * a + b * 2
            );
        }

        case 7: {
            const a = randomInt(3, 12);
            const b = randomInt(3, 12);
            return makeQuestion(
                "Mental Multiplication",
                `${a * 10} × ${b} = ?`,
                a * 10 * b
            );
        }

        case 8: {
            const a = randomInt(2, 12);
            const b = randomInt(2, 12);
            return makeQuestion(
                "Division",
                `${a * b * 10} ÷ ${a} = ?`,
                b * 10
            );
        }

        default: {
            const a = randomInt(3, 10);
            const b = randomInt(3, 10);
            const c = randomInt(3, 10);

            return makeQuestion(
                "BODMAS",
                `${a * b} - ${c}² = ?`,
                a * b - c * c
            );
        }
    }
}

// =====================================
// CREATE QUESTIONS
// =====================================

function generateQuestion() {
    if (currentLevel === 1) {
        return levelOneQuestion();
    }

    if (currentLevel === 2) {
        return levelTwoQuestion();
    }

    return levelThreeQuestion();
}

// =====================================
// START GAME
// =====================================

playGameBtn.addEventListener("click", () => {
    welcomeScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    startLevel(1);
});

// =====================================
// START A LEVEL
// =====================================

function startLevel(level) {
    stopTimer();

    clearTimeout(nextTimeout);

    currentLevel = level;
    questionIndex = 0;
    correctAnswers = 0;
    coinsThisLevel = 0;
    streak = 0;

    score = 0;

    updateStats();
    updateLevelButtons();

    levelText.textContent = `Level ${level} - ${
        level === 1 ? "Easy" :
        level === 2 ? "Medium" : "Hard"
    }`;

    gameScreen.classList.remove("hidden");
    resultScreen.classList.add("hidden");

    showQuestion();
}

// =====================================
// SHOW QUESTION
// =====================================

function showQuestion() {
    stopTimer();
    clearTimeout(nextTimeout);

    if (questionIndex >= TOTAL_QUESTIONS) {
        finishLevel();
        return;
    }

    answered = false;
    currentQuestion = generateQuestion();

    questionNumber.textContent = questionIndex + 1;

    progressBar.style.width =
        `${(questionIndex / TOTAL_QUESTIONS) * 100}%`;

    topicLabel.textContent = currentQuestion.topic;
    questionElement.textContent = currentQuestion.text;

    answerInput.value = "";
    answerInput.disabled = false;

    messageElement.textContent = "You can do it! 💪";
    messageElement.className = "message";

    timeLeft = QUESTION_TIME;
    updateTimer();

    answerInput.focus();
    startTimer();
}

// =====================================
// TIMER
// =====================================

function startTimer() {
    stopTimer();

    timerInterval = setInterval(() => {
        if (answered) return;

        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            handleTimeout();
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimer() {
    timerElement.textContent = timeLeft;

    document.querySelector(".timer-area")
        .classList.toggle("urgent", timeLeft <= 10);
}

// =====================================
// CHECK ANSWER
// =====================================

answerForm.addEventListener("submit", event => {
    event.preventDefault();

    if (answered) return;

    const rawAnswer = answerInput.value.trim();

    if (rawAnswer === "") {
        messageElement.textContent = "Please enter an answer!";
        messageElement.className = "message bad";
        return;
    }

    const userAnswer = Number(rawAnswer);

    if (!Number.isFinite(userAnswer)) {
        messageElement.textContent = "Enter a valid number.";
        messageElement.className = "message bad";
        return;
    }

    answered = true;
    stopTimer();

    answerInput.disabled = true;

    const isCorrect =
        Math.abs(userAnswer - currentQuestion.answer) < 0.000001;

    if (isCorrect) {
        correctAnswers++;
        streak++;

        const earned = 5 + Math.floor(timeLeft / 5);

        score += 10;
        coins += earned;
        coinsThisLevel += earned;

        messageElement.textContent =
            `🎉 Correct! +10 points and +${earned} coins!`;

        messageElement.className = "message good";
    } else {
        streak = 0;

        messageElement.textContent =
            `Not quite! The correct answer is ${currentQuestion.answer}.`;

        messageElement.className = "message bad";
    }

    updateStats();

    nextTimeout = setTimeout(() => {
        questionIndex++;
        showQuestion();
    }, 1400);
});

// =====================================
// TIME OUT
// =====================================

function handleTimeout() {
    if (answered) return;

    answered = true;
    stopTimer();

    answerInput.disabled = true;
    streak = 0;

    messageElement.textContent =
        `⏰ Time's up! Answer: ${currentQuestion.answer}`;

    messageElement.className = "message bad";

    updateStats();

    nextTimeout = setTimeout(() => {
        questionIndex++;
        showQuestion();
    }, 1500);
}

// =====================================
// UPDATE STATS
// =====================================

function updateStats() {
    scoreElement.textContent = score;
    coinsElement.textContent = coins;
    streakElement.textContent = streak;
}

// =====================================
// LEVEL BUTTONS
// =====================================

function updateLevelButtons() {
    document.querySelectorAll(".level").forEach(button => {
        const level = Number(button.dataset.level);

        button.classList.toggle("active", level === currentLevel);

        button.disabled = !unlockedLevels.has(level);
        button.style.opacity = button.disabled ? "0.45" : "1";
        button.title = button.disabled ? "Complete the previous level first" : "";
    });
}

document.querySelectorAll(".level").forEach(button => {
    button.addEventListener("click", () => {
        const level = Number(button.dataset.level);

        if (!unlockedLevels.has(level)) return;

        startLevel(level);
    });
});

// =====================================
// FINISH LEVEL
// =====================================

function finishLevel() {
    stopTimer();

    gameScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    document.getElementById("finalScore").textContent = score;
    document.getElementById("finalCorrect").textContent =
        `${correctAnswers}/${TOTAL_QUESTIONS}`;
    document.getElementById("finalCoins").textContent = coinsThisLevel;

    const percentage = (correctAnswers / TOTAL_QUESTIONS) * 100;

    document.getElementById("resultIcon").textContent =
        percentage >= 80 ? "🏆" :
        percentage >= 50 ? "🌟" : "💪";

    document.getElementById("resultTitle").textContent =
        percentage >= 80 ? "Amazing Work!" :
        percentage >= 50 ? "Good Job!" : "Keep Practising!";

    document.getElementById("resultDescription").textContent =
        `You answered ${correctAnswers} out of ${TOTAL_QUESTIONS} questions correctly.`;

    if (currentLevel < 3) {
        unlockedLevels.add(currentLevel + 1);
        nextLevelBtn.classList.remove("hidden");
        nextLevelBtn.textContent = `UNLOCK LEVEL ${currentLevel + 1} →`;
    } else {
        nextLevelBtn.classList.add("hidden");
        document.getElementById("resultTitle").textContent =
            "🎉 Mental Maths Champion!";
        document.getElementById("resultDescription").textContent =
            "You completed all three Grade 8 levels!";
    }

    updateLevelButtons();
}

// =====================================
// RESULT BUTTONS
// =====================================

nextLevelBtn.addEventListener("click", () => {
    if (currentLevel < 3) {
        startLevel(currentLevel + 1);
    }
});

retryBtn.addEventListener("click", () => {
    startLevel(currentLevel);
});

homeBtn.addEventListener("click", () => {
    stopTimer();
    clearTimeout(nextTimeout);

    resultScreen.classList.add("hidden");
    gameScreen.classList.add("hidden");
    welcomeScreen.classList.remove("hidden");
});

// =====================================
// INITIAL SETUP
// =====================================

updateStats();
updateLevelButtons();
