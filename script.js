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
      questionBlock.style.border = "2px solid red";
    } else {
      questionBlock.style.border = "none";
      if (selected.value === answers[q]) {
        score++;
      }
    }
  });

  if (!allAnswered) {
    quizResult.textContent = "Please answer all questions!";
    quizResult.style.color = "red";
    return;
  }

  const messages = [
    "Nice try! Keep training and you’ll be a champ in no time!",
    "Great effort! You’re scoring like a pro!",
    "Awesome! You really know your sports!",
    "Legendary! You crushed this quiz like a true MVP!",
  ];
  const colors = ["#c0392b", "#f39c12", "#27ae60", "#2980b9"];
  quizResult.textContent = `You scored ${score} out of 3. ${messages[score]}`;
  quizResult.style.color = colors[score];

  // Extra content
  extraContent.innerHTML = "";

  const img = document.createElement("img");
  img.src = `https://via.placeholder.com/100?text=Level+${score}`;
  img.alt = "Fan Level Icon";
  img.style.width = "100px";
  extraContent.appendChild(img);

  const factBtn = document.createElement("button");
  factBtn.textContent = "Show me a fun sports fact!";
  extraContent.appendChild(factBtn);

  const factDiv = document.createElement("div");
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
});

resetQuizBtn.addEventListener("click", function () {
  quizForm.reset();
  quizResult.textContent = "";
  quizResult.style.color = "black";
  extraContent.innerHTML = "";
  const questions = quizForm.querySelectorAll(".quiz-question");
  questions.forEach(q => q.style.border = "none");
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
  board.innerHTML = "<h3>🏅 Top Scores</h3><ol>" + leaderboard.map(e => `<li>${e.name}: ${e.score}/3</li>`).join("") + "</ol>";
  extraContent.appendChild(board);
}
const userName = prompt("Enter your name for the leaderboard:");
if (userName) {
  updateLeaderboard(userName, score);
}