let initiatives = [];
let candidates = [];

async function addBallotRequest(societyName, electionName) {
  const res = await fetch("https://teamkal.webdev.gccis.rit.edu/ballotcreate", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({"societyName": societyName, "electionName": electionName, "initiatives": initiatives, "candidates": candidates})
  });
  console.log(await res.text());
}

function addInitiative(name, description) {
  initiatives.push({"name" : name, "description" : description});
  console.log(initiatives);
}

function addCandidate(name, description, office) {
  candidates.push({"name": name, "office": office, "description": description});
  console.log(candidates);
}

async function addOffice(name, elecName) {
  const res = await fetch("https://teamkal.webdev.gccis.rit.edu/addoffice", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({"officeName": name, "elec_name": elecName})
  });
  console.log(await res.text());
}

async function populateBallot(elecName) {
  const res = await fetch("https://teamkal.webdev.gccis.rit.edu/ballotpopulate", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({"electionName": elecName, "initiatives": initiatives, "candidates": candidates})
  });
  console.log(await res.text());
}
