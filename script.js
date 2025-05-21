const quizForm = document.getElementById("sportsQuizForm");
const quizResult = document.getElementById("quizResult");
const extraContent = document.getElementById("extraContent");
const resetQuizBtn = document.getElementById("resetQuizBtn");

quizForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const questions = ["q1", "q2", "q3"];
  const answers = { q1: "11", q2: "France", q3: "40" };
  let score = 0;
  let allAnswered = true;

  questions.forEach((q) => {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    const questionBlock = document.querySelector(`input[name="${q}"]`).closest(".quiz-question");

    if (!selected) {
      allAnswered = false;
      questionBlock.classList.add("unanswered");
    } else {
      questionBlock.classList.remove("unanswered");
      if (selected.value === answers[q]) {
        score++;
      }
    }
  });

  if (!allAnswered) {
    quizResult.textContent = "Please answer all questions!";
    quizResult.className = "result error";
    return;
  }

  const messages = [
    "Nice try! Keep training and you’ll be a champ in no time!",
    "Great effort! You’re scoring like a pro!",
    "Awesome! You really know your sports!",
    "Legendary! You crushed this quiz like a true MVP!",
  ];
  const colors = ["low", "medium", "high", "top"]; // used as class names

  quizResult.textContent = `You scored ${score} out of 3. ${messages[score]}`;
  quizResult.className = `result ${colors[score]}`;

  // Clear and show extra content
  extraContent.innerHTML = "";

  const factBtn = document.createElement("button");
  factBtn.textContent = "Show me a fun sports fact!";
  factBtn.classList.add("fact-button");
  extraContent.appendChild(factBtn);

  const factDiv = document.createElement("div");
  factDiv.classList.add("fact");
  extraContent.appendChild(factDiv);

  factBtn.addEventListener("click", () => {
    const facts = [
      "The fastest goal in World Cup history was scored after just 11 seconds!",
      "Basketball was invented in 1891 by James Naismith.",
      "The longest tennis match lasted 11 hours and 5 minutes!",
    ];
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    factDiv.textContent = randomFact;
  });

  const userName = prompt("Enter your name for the leaderboard:");
  if (userName) {
    updateLeaderboard(userName.trim(), score);
  }
});

resetQuizBtn.addEventListener("click", function () {
  quizForm.reset();
  quizResult.textContent = "";
  quizResult.className = "result";
  extraContent.innerHTML = "";

  const questions = quizForm.querySelectorAll(".quiz-question");
  questions.forEach(q => q.classList.remove("unanswered"));
});

// Leaderboard
function updateLeaderboard(name, score) {
  const leaderboard = JSON.parse(localStorage.getItem("quizLeaderboard")) || [];
  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem("quizLeaderboard", JSON.stringify(leaderboard.slice(0, 5))); // Top 5
  showLeaderboard();
}

function showLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem("quizLeaderboard")) || [];
  const board = document.createElement("div");
  board.classList.add("leaderboard");

  board.innerHTML = "<h3>🏅 Top Scores</h3><ol>" +
    leaderboard.map(e => `<li>${e.name}: ${e.score}/3</li>`).join("") +
    "</ol>";

  extraContent.appendChild(board);
}

