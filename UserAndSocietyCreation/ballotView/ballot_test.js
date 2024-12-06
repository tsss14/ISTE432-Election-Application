document.addEventListener('DOMContentLoaded', () => {
    const submitVoteButton = document.getElementById('submit-vote');
    let selectedCandidateId = null;

    // active election and candidates for society_id = 1 (hardcoded for testing)
    async function fetchElectionData() {
        try {
            const electionResponse = await fetch('/getActiveElection');  
            const electionData = await electionResponse.json();

            if (electionData) {
                // show election details
                document.getElementById('election-name').textContent = electionData.election.name;
                document.getElementById('election-start-date').textContent = `Starts at: ${electionData.election.startsAt}`;
                document.getElementById('election-end-date').textContent = `Ends at: ${electionData.election.endsAt}`;

                // show candidates
                const candidateList = document.getElementById('candidate-list');
                candidateList.innerHTML = '';  // Clear existing candidates
                electionData.candidates.forEach(candidate => {
                    const candidateItem = document.createElement('li');
                    candidateItem.textContent = `${candidate.candidateName} - ${candidate.description}`;

                    // button to select candidate
                    const selectButton = document.createElement('button');
                    selectButton.textContent = 'Select';
                    selectButton.onclick = () => selectCandidate(candidate.candidate_id);

                    candidateItem.appendChild(selectButton);
                    candidateList.appendChild(candidateItem);
                });
            } else {
                console.log('No active election found.');
            }
        } catch (error) {
            console.error('Error fetching election data:', error);
        }
    }

    // handle candidate selection
    function selectCandidate(candidateId) {
        selectedCandidateId = candidateId;
        submitVoteButton.disabled = false;  // Enable the submit button
    }

    // handle vote submission
    async function submitVote() {
        if (!selectedCandidateId) {
            alert('Please select a candidate before submitting your vote.');
            return;
        }

        try {
            const response = await fetch('/submitVote', {  // Adjust the endpoint as necessary
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ candidate_id: selectedCandidateId })
            });
            
            const result = await response.json();
            if (result.success) {
                alert('Your vote has been submitted!');
            } else {
                alert('There was an error submitting your vote.');
            }
        } catch (error) {
            console.error('Error submitting vote:', error);
        }
    }

    submitVoteButton.addEventListener('click', submitVote);

    fetchElectionData();
});
