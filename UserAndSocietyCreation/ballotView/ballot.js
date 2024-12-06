// Load the ballot
document.addEventListener('DOMContentLoaded', () => {
    const loadButton = document.getElementById('loadUserBallot');
    loadButton.addEventListener('click', loadBallot);
});

// Display the ballot
async function loadBallot() {
    const userId = document.getElementById('userId').value.trim();

    if (!userId) {
        alert("Please enter a User ID.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/getActiveElection?user_id=${userId}`);
        const electionData = await response.json();

        if (electionData && electionData.election) {
            displayBallot(electionData);
        } else {
            displayMessage("No active election found.");
        }
    } catch (error) {
        console.error("Error fetching election data:", error);
        displayMessage("Error loading the ballot. Please try again later.");
    }
}

// Display the ballot data
function displayBallot(data) {
    const ballotContent = document.getElementById('ballotContent');
    const election = data.election;
    const offices = data.offices;
    const candidates = data.candidates;
    const initiatives = data.initiatives;

    let content = `
        <h3>${election.name}</h3>
        <p><strong>Start Date:</strong> ${election.startsAt} <strong>End Date:</strong> ${election.endsAt}</p>
        <h4>Offices and Candidates:</h4>`;

    offices.forEach((office) => {
        content += `<h5>${office.officeName}</h5><ul>`;
        candidates
            .filter((candidate) => candidate.office_id === office.office_id)
            .forEach((candidate) => {
                content += `
                    <li>
                        <input type="radio" name="candidate-${office.office_id}" id="candidate-${candidate.candidate_id}" value="${candidate.candidate_id}">
                        <label for="candidate-${candidate.candidate_id}">${candidate.candidateName}</label>
                    </li>`;
            });
        content += `</ul>`;
    });

    if (initiatives.length > 0) {
        content += `<h4>Initiatives:</h4><ul>`;
        initiatives.forEach((init) => {
            content += `
                <li>
                    <input type="checkbox" id="initiative-${init.initiative_id}" value="${init.initiative_id}">
                    <label for="initiative-${init.initiative_id}">${init.initName}</label>
                </li>`;
        });
        content += `</ul>`;
    }

    content += `<button class="btn btn-primary" id="submitVote">Submit Vote</button>`;
    ballotContent.innerHTML = content;

    document.getElementById('submitVote').addEventListener('click', submitVote);
}

// Display message
function displayMessage(message) {
    const ballotContent = document.getElementById('ballotContent');
    ballotContent.innerHTML = `<h4>${message}</h4>`;
}

// Submit the vote
async function submitVote() {
    const selectedCandidates = [];
    const selectedInitiatives = [];

    // Collect selected candidates
    document.querySelectorAll('input[type=radio]:checked').forEach((input) => {
        selectedCandidates.push(input.value);
    });

    // Collect selected initiatives
    document.querySelectorAll('input[type=checkbox]:checked').forEach((input) => {
        selectedInitiatives.push(input.value);
    });

    const voteData = {
        candidates: selectedCandidates,
        initiatives: selectedInitiatives,
    };

    try {
        const response = await fetch('http://localhost:3000/submitVote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(voteData),
        });

        if (response.ok) {
            alert("Vote submitted successfully!");
        } else {
            alert("Error submitting vote.");
        }
    } catch (error) {
        console.error("Error submitting vote:", error);
        alert("Error submitting vote. Please try again later.");
    }
}
