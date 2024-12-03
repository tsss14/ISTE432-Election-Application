async function getActiveBallots() {
    const res = await fetch("http://localhost:3000/getActiveBallots", {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    })
    let data = await res.json();
    data = data.rows;
    data.forEach(row => {
        $('#electionSelect').append(`<button class="btn btn-primary d-block" type="button" onclick="getBallotData(${row.name})">${row.name}</button>`);
    });
}

async function getBallotData(ballotName) {
    let res = await fetch("http://localhost:3000/getBallotInitData", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ballot_name: ballotName})
    });

    let data = await res.json();
    data = data.rows;

    data.forEach(row => {
        $('#initiativeSelect').append(`<p>${row.initName}</p>`);
    });

    res = await fetch("http://localhost:3000/getBallotCandData", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ballot_name: ballotName})
    });

    data = await res.json();
    data = data.rows;

    res = await fetch("http://localhost:3000/getBallotInfo", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ballot_name: ballotName})
    });

    data = await res.json();
    data = data.rows;
    
}