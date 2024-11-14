let initiatives = [];
let candidates = [];

async function addBallotRequest(societyName, electionName) {
  const res = await fetch("http://localhost:3000/ballotcreate", {
    method: "POST",
    body: JSON.stringify({"societyName": societyName, "electionName": electionName, "initiatives": initiatives, "candidates": candidates})
  });
  console.log(await res.text());
}

function addInitiative(name, description) {
  initiatives.push({"name" : name, "description" : description});
}

function addCandidate(name, office, description) {
  candidates.push({"name": name, "office": office, "description": description});
}