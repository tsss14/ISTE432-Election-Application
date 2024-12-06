document.addEventListener("DOMContentLoaded", function () {
    const ballotForm = document.getElementById('ballotForm');
    const userIdInput = document.getElementById('userId');
    const ballotResultsDiv = document.getElementById('ballotResults');

    ballotForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const userId = userIdInput.value.trim();
        
        if (userId) {
            fetchBallotData(userId);
        } else {
            ballotResultsDiv.innerHTML = "Please enter a valid user ID.";
        }
    });

    function fetchBallotData(userId) {
        // example ballot, not actual API or data fetching logic
        const mockBallotData = {
            id: 1,
            title: "Election 2024",
            candidates: ["Candidate A", "Candidate B", "Candidate C"]
        };

        displayBallot(mockBallotData);
    }

    function displayBallot(ballotData) {
        if (ballotData) {
            let ballotHtml = `<h2>${ballotData.title}</h2>`;
            ballotHtml += "<ul>";
            ballotData.candidates.forEach(candidate => {
                ballotHtml += `<li>${candidate}</li>`;
            });
            ballotHtml += "</ul>";

            ballotResultsDiv.innerHTML = ballotHtml;
        } else {
            ballotResultsDiv.innerHTML = "No ballot data available.";
        }
    }
});
