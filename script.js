document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("fanPollForm");
    const resultsDiv = document.getElementById("pollResults");

    // Load votes from localStorage or initialize
    const players = ["Ronaldo", "Mbappe", "Messi"];
    let votes = JSON.parse(localStorage.getItem("fanPollVotes")) || {
        Ronaldo: 0,
        Mbappe: 0,
        Messi: 0
    };

    function renderResults() {
        resultsDiv.innerHTML = "";
        const totalVotes = players.reduce((sum, p) => sum + votes[p], 0);
        
        if (totalVotes === 0) {
            resultsDiv.innerHTML = "<p>No votes yet. Be the first to vote!</p>";
            return;
        }

        players.forEach(player => {
            const percent = ((votes[player] / totalVotes) * 100).toFixed(1);
            resultsDiv.innerHTML += `
                <p><strong>${player}:</strong> ${votes[player]} votes (${percent}%)</p>
               // <div style="background: #ddd; width: 100%; height: 20px; border-radius: 5px;">
                    <div style="width: ${percent}%; background: #4caf50; height: 100%; border-radius: 5px;"></div>
                </div>
                <br>
            `;
        });
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const selected = form.player.value;
        if (!selected) {
            alert("Please select a player before voting.");
            return;
        }

        votes[selected]++;
        localStorage.setItem("fanPollVotes", JSON.stringify(votes));
        renderResults();
        alert("Thanks for voting!");
        form.reset();
    });

    // Initial render
    renderResults();
});
// Reset Votes Button
const resetBtn = document.getElementById("resetPollBtn");
resetBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to reset all votes?")) {
        votes = {
            Ronaldo: 0,
            Mbappe: 0,
            Messi: 0
        };
        localStorage.setItem("fanPollVotes", JSON.stringify(votes));
        renderResults();
        alert("Votes have been reset.");
    }
});
// === Sports Quiz Logic ===
const quizForm = document.getElementById("sportsQuizForm");
const quizResult = document.getElementById("quizResult");
const resetQuizBtn = document.getElementById("resetQuizBtn");

quizForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const answers = {
        q1: "11",
        q2: "France",
        q3: "40"
    };

    let score = 0;

    for (let question in answers) {
        const userAnswer = quizForm[question].value;
        if (userAnswer === answers[question]) {
            score++;
        }
    }

    quizResult.textContent = `You scored ${score} out of 3.`;
});

resetQuizBtn.addEventListener("click", function () {
    quizForm.reset();
    quizResult.textContent = "";
});
const shareBtn = document.getElementById("shareQuizBtn");
const shareFeedback = document.getElementById("shareFeedback");

shareBtn.addEventListener("click", function () {
    const scoreText = quizResult.textContent || "Check out this cool sports quiz!";
    const shareUrl = window.location.href;

    if (navigator.share) {
        // ✅ Mobile-friendly native share
        navigator.share({
            title: "Mini Sports Quiz",
            text: scoreText,
            url: shareUrl
        }).then(() => {
            shareFeedback.textContent = "Shared successfully!";
        }).catch((err) => {
            shareFeedback.textContent = "Sharing failed.";
        });
    } else {
        // 🔗 Fallback: copy to clipboard
        const fullText = `${scoreText} 👉 ${shareUrl}`;
        navigator.clipboard.writeText(fullText).then(() => {
            shareFeedback.textContent = "Link copied! You can now paste it to share.";
        }).catch(() => {
            shareFeedback.textContent = "Could not copy link.";
        });
    }
});