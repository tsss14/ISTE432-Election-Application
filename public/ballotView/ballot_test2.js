document.addEventListener('DOMContentLoaded', () => {
    const submitVoteButton = document.getElementById('submit-vote');
    let selectedCandidates = { 1: null, 2: null, 3: null };  // track selected candidates for each office

    // list of offices and candidates
    const offices = [
        {
            office_id: 1,
            officeName: 'Treasurer',
            candidates: [
                { candidate_id: 1, candidateName: 'Gabriel Lawrence', description: 'With a background in psychology and a passion for helping others unlock their full potential, this individual has dedicated their career to the field of coaching and personal development. Through their transformative coaching programs and workshops, they have empowered countless individuals to overcome obstacles, achieve their goals, and live lives of fulfillment and purpose. Their unique blend of empathy, insight, and practical wisdom has made them a trusted guide and mentor to clients seeking to create positive change in their lives.' }
            ]
        },
        {
            office_id: 2,
            officeName: 'President',
            candidates: [
                { candidate_id: 2, candidateName: 'Billy Howard', description: '' },
                { candidate_id: 3, candidateName: 'Justin Stewart', description: '' },
                { candidate_id: 4, candidateName: 'Amy Bishop', description: '' },
                { candidate_id: 5, candidateName: 'Anna Rodriguez', description: '' }
            ]
        },
        {
            office_id: 3,
            officeName: 'Secretary',
            candidates: [
                { candidate_id: 6, candidateName: 'Catherine Reed', description: 'With a background in finance and a keen eye for detail, this individual has established themselves as a trusted advisor in the world of investment management. Their strategic insights and prudent decision-making have consistently delivered strong returns for their clients, earning them a reputation as a savvy investor and a thought leader in the financial sector.' }
            ]
        }
    ];

    // display offices and their candidates
    function displayOffices() {
        const officeContainer = document.getElementById('office-container');
        officeContainer.innerHTML = '';  

        offices.forEach(office => {
            const officeSection = document.createElement('section');
            const officeHeader = document.createElement('h2');
            officeHeader.textContent = office.officeName;
            officeSection.appendChild(officeHeader);

            const candidateList = document.createElement('ul');
            office.candidates.forEach(candidate => {
                const candidateItem = document.createElement('li');
                candidateItem.textContent = `${candidate.candidateName} - ${candidate.description}`;

                // select button for each candidate
                const selectButton = document.createElement('button');
                selectButton.textContent = 'Select';
                selectButton.onclick = () => selectCandidate(office.office_id, candidate.candidate_id);

                candidateItem.appendChild(selectButton);
                candidateList.appendChild(candidateItem);
            });

            officeSection.appendChild(candidateList);
            officeContainer.appendChild(officeSection);
        });
    }

    // candidate selection for a specific office
    function selectCandidate(officeId, candidateId) {
        selectedCandidates[officeId] = candidateId;
        submitVoteButton.disabled = false;  
    }

    // vote submission for all offices
    async function submitVote() {
        const allOfficesSelected = Object.values(selectedCandidates).every(candidateId => candidateId !== null);

        if (!allOfficesSelected) {
            alert('Please select a candidate for each office before submitting your vote.');
            return;
        }

        try {
            // replace with endpoint later
            const response = await fetch('/submitVote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ selectedCandidates })
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

    // on page load,
    displayOffices();
});
