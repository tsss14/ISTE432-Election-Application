async function getActiveBallots() {
    const res = await fetch("https://teamkal.webdev.gccis.rit.edu/getActiveBallots", {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    })
    let data = await res.json();
    data = data.rows;
    data.forEach(row => {
        $('#electionSelect').append(`<button class="btn btn-primary d-block" type="button" onclick="getBallotData(${row.election_id})">${row.name}</button>`);
    });
}

async function getBallotData(electionID) {
    let res = await fetch("https://teamkal.webdev.gccis.rit.edu/getBallotInitData", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({election_id: electionID})
    });
    let data = await res.json();
    data.forEach(row => {
        $('#initiativeSelect').append(`<p>${row.initName}</p>`);
    });

    res = await fetch("https://teamkal.webdev.gccis.rit.edu/getBallotCandData", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({election_id: electionID})
    });

    data = await res.json();
    console.log(data);
    data.forEach(row => {
        $('#candidateSelect').append(`<p>${row.name}</p>`);
    });

    res = await fetch("https://teamkal.webdev.gccis.rit.edu/getBallotData", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({election_id: electionID})
    });

    data = await res.json();
    $('#infoEditor').append(`<input type='text' value='${data.rows[0].name}'></input>`);
    
}