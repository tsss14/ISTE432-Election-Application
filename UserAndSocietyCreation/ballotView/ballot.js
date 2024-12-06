async function loadBallot(user_id) {
    try {
        // Pass user_id as a query parameter
        const electionData = await fetch(`http://localhost:3000/getActiveElection?user_id=${user_id}`)
            .then(response => response.json());

        if (electionData && electionData.election) {
            displayBallot(electionData);
        } else {
            $('#ballotContent').html('<h4>No active election found for this user.</h4>');
        }
    } catch (err) {
        console.log("Error fetching election data:", err);
        $('#ballotContent').html('<h4>Error loading ballot. Please try again later.</h4>');
    }
}

function displayBallot(data) {
    const election = data.election;
    const offices = data.offices || [];
    const candidates = data.candidates || [];
    const initiatives = data.initiatives || [];

    let content = `<h3>${election.name}</h3>
                   <p><strong>Start Date:</strong> ${election.startsAt} <strong>End Date:</strong> ${election.endsAt}</p>
                   <h4>Offices and Candidates:</h4>`;

    offices.forEach(office => {
        content += `<h5>${office.officeName}</h5><ul>`;
        candidates.filter(candidate => candidate.office_id === office.office_id).forEach(candidate => {
            content += `<li>
                            <input type="radio" name="candidate-${office.office_id}" id="candidate-${candidate.candidate_id}" value="${candidate.candidate_id}">
                            <label for="candidate-${candidate.candidate_id}">${candidate.candidateName}</label>
                        </li>`;
        });
        content += `</ul>`;
    });

    if (initiatives.length > 0) {
        content += `<h4>Initiatives:</h4><ul>`;
        initiatives.forEach(init => {
            content += `<li>
                            <input type="checkbox" id="initiative-${init.initiative_id}" value="${init.initiative_id}">
                            <label for="initiative-${init.initiative_id}">${init.initName}</label>
                        </li>`;
        });
        content += `</ul>`;
    }

    content += `<button class="btn btn-primary" id="submitVote">Submit Vote</button>`;
    $('#ballotContent').html(content);

    $('#submitVote').click(submitVote);
}

async function submitVote() {
    const selectedCandidates = [];
    const selectedInitiatives = [];

    // Collect selected candidates
    $('input[type=radio]:checked').each(function() {
        selectedCandidates.push($(this).val());
    });

    // Collect selected initiatives
    $('input[type=checkbox]:checked').each(function() {
        selectedInitiatives.push($(this).val());
    });

    const voteData = {
        candidates: selectedCandidates,
        initiatives: selectedInitiatives
    };

    try {
        const response = await fetch('http://localhost:3000/submitVote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(voteData)
        });

        if (response.ok) {
            alert("Vote submitted successfully!");
        } else {
            alert("Error submitting vote.");
        }
    } catch (err) {
        console.log("Error submitting vote:", err);
        alert("Error submitting vote. Please try again.");
    }
}

$(document).ready(() => {
    $('#loadUserBallot').click(() => {
        // Capture user_id input from the text box
        const user_id = $('#userId').val().trim();

        if (user_id) {
            loadBallot(user_id); // Pass user_id to the loadBallot function
        } else {
            alert("Please enter a User ID.");
        }
    });
});
