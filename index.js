const express = require('express');
const path = require('path');
const app = express();
const {validateLogin, getInitiativeData, registerUser, getCandidateData, getBallotData, getActiveBallots, createOffice, populateBallot, createBallot, createUser, createSociety, callPreviousElections, callOngoingElections, callElection,callSocieties, getActiveElectionByUser, getSystemStats, getElectionData, callProfile} = require('./businessLayer.js');
const port = 3000;

app.use(express.static(path.join(__dirname, '/public/')));

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === "OPTIONS") {
        return res.status(200).end();  
    }
    next();
    // const start = Date.now(); This function need to be in this app.use, but the query should happen in the business layer
    // res.on('finish', () => {
    //    const duration = Date.now() - start; 
  
    //   CLIENT.query(`
    //      INSERT INTO americanDreamDB."System" ("queryTime", "httpTime")
    //      VALUES ($1, $2)
    //    `, [duration, res.statusCode]);
    // });
    // next();
});

app.get("/getActiveBallots", async function(req, res) {
    const resp = await getActiveBallots();
    if(resp === -1) {
        return res.status(400).send(-1);
    }
    return res.status(200).send(resp);
});

app.post("/getBallotInitData", async function(req, res) {
    const electionID = req.body.election_id;
    const resp = await getInitiativeData(electionID);
    if(resp === -1) return res.status(400).send(-1);
    return res.status(200).send(resp);
});

app.post("/getBallotCandData", async function(req, res) {
    const electionID = req.body.election_id;
    const resp = await getCandidateData(electionID);
    if(resp === -1) return res.status(400).send(-1);
    return res.status(200).send(resp);
});

app.post("/getBallotData", async function(req, res) {
    const electionID = req.body.election_id;
    const resp = await getBallotData(electionID);
    if(resp === -1) return res.status(400).send(-1);
    return res.status(200).send(resp);
});

// updated for pass hashing
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send("Missing username or password");
    }

    try {
        const sessionID = await validateLogin(username, password);
        if (sessionID) {
            res.status(200).json({ sessionID });
        } else {
            res.status(401).send("Invalid username or password");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal server error");
    }
});

app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/login/index.html"));
    });


//incorporating user registering
app.post('/register', async (req, res) => {
    const { username, role, firstName, lastName, phone, password } = req.body;
    if (!username || !role || !firstName || !lastName || !password) {
        return res.status(400).send("All fields are required.");
    }

    try {
        await registerUser(username, role, firstName, lastName, phone, password);
        res.status(201).send("User registered successfully.");
    } catch (error) {
        console.error("Error during user registration:", error);
        if (error.message.includes("Password must contain")) {
            return res.status(400).send(error.message);
        }
        res.status(500).send("Internal server error.");
    }
});

app.post("/usrcreate", async function(req, res) {
	console.log(req.body);
	const uname = req.body.username;
	const role = req.body.role;
	const fname = req.body.fname;
	const lname = req.body.lname;
	const phone = req.body.phone;
        const returnVal = await createUser(uname, role, fname, lname, phone);
        if(returnVal === "") {
            return res.status(400).send("Bad user info...");
        }
        return res.status(200).send(returnVal);
});

app.get("/api/pastElections", async (req, res) => {

    const returnVal = await callPreviousElections();
    if(returnVal === "") {
        return res.status(400).send("Bad user info...");
    } else {
        return res.status(200).send(returnVal);
    }
});

app.get("/pastElections", function(req, res) {
res.sendFile(path.join(__dirname, "/public/pastElections/index.html"));
});

app.get("/api/societyView", async function(req, res) {

const returnVal = await callSocieties();
if(returnVal === "") {
    return res.status(400).send("Bad user info...");
} else {
    return res.status(200).send(returnVal);
}
});

app.get("/societyView", function(req, res) {
res.sendFile(path.join(__dirname, "/public/societyView/index.html"));
});

app.get("/api/profileView", async function(req, res) {

const returnVal = await callProfile();
if(returnVal === "") {
    return res.status(400).send("Bad user info...");
} else {
    return res.status(200).send(returnVal);
}
});

app.get("/profileView", function(req, res) {
res.sendFile(path.join(__dirname, "/public/profileView/index.html"));
});

app.get("/api/onGoingElections", async function(req, res) {

const returnVal = await callOngoingElections();
if(returnVal === "") {
    return res.status(400).send("Bad user info...");
} else {
    return res.status(200).send(returnVal);
}
});



app.post("/soccreate", async function(req, res) {
    console.log(req.body);
	const socName = req.body.societyName;
    const returnVal = await createSociety(socName);
    if(returnVal === "") {
        return res.status(400).send("Bad society name...");
    }
    return res.status(200).send(returnVal);
});

app.get("/ElectionView", async function(req, res) {
    
    const returnVal = await callElection();
    if(returnVal === "") {
        return res.status(400).send("Bad user info...");
    }
    return res.status(200).send(returnVal);
});


app.post("/ballotcreate", async function(req, res) {
    console.log(req.body);
	const socName = req.body.societyName;
	const elecName = req.body.electionName;
    const returnVal = await createBallot(socName, elecName);
    if(returnVal === "") {
        return res.status(400).send("Bad ballot info...");
    }
    return res.status(200).send(returnVal);
});

app.post("/addoffice", async function(req, res) {
    console.log(req.body);
    const officeName = req.body.officeName;
    const elecName = req.body.elec_name;
    if (await createOffice(officeName, elecName) !== -1) {
        return res.status(200).send("Office added succesfully.");
    } else {
        return res.status(400).send("Office not added.");
    }
});

app.post("/ballotpopulate", async function(req, res) {
    console.log(req.body);
	const elecName = req.body.electionName;
	const cndts = req.body.candidates;
	const inits = req.body.initiatives;
    const returnVal = await populateBallot(elecName, cndts, inits);
    if(returnVal === "") {
        return res.status(400).send("Bad ballot info...");
    }
    return res.status(200).send(returnVal);
});

// ---------------------------------------------------------------- Page Serving
app.get("/AdminMenu", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/adminMenu/index.html"));
});

app.get("/BallotCreation", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/ballotCreation/index.html"));
});

app.get("/AdminStatistics", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/adminStatistics/index.html"));
});

app.get("/BallotEdit", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/ballotEditor/index.html"));
});

app.get("/onGoingElections", function(req, res) {
res.sendFile(path.join(__dirname, "/public/onGoingElections/index.html"));
});



// ---------------------------------------------------------------- Luke API calls

// Gets active election for logged in user for ballot page
app.get("/activeelectionget", async function(req, res) {
    console.log(req.body);
    const user_id = req.body.user_id;
    const returnVal = await getActiveElectionByUser(user_id);
    if(returnVal === "") {
        return res.status(400).send("Bad user id...");
    }
    return res.status(200).send(returnVal);
});

// Track HTTP response times
//app.use((req, res, next) => {
//     const start = Date.now(); 
//     res.on('finish', () => {
//       const duration = Date.now() - start; 
  
//       CLIENT.query(`
//         INSERT INTO americanDreamDB."System" ("queryTime", "httpTime")
//         VALUES ($1, $2)
//       `, [duration, res.statusCode]);
//     });
//     next();
// });
  
// Sends system stats to systemstats.js
app.get('/system-stats', async (req, res) => {
    try {
        const stats = await getSystemStats();
        
        res.json(stats);
    } catch (error) {
        console.error('Error fetching system stats:', error);
        res.status(500).json({ error: 'Failed to retrieve system stats.' });
    }
});

// Gets current active election for logged in user
app.get("/getActiveElection", async function(req, res) {
    const user_id = req.query.user_id;  
    const electionData = await getElectionData(user_id);
    
    if (!electionData) {
        return res.status(404).send("No active election found.");
    }

    return res.status(200).json(electionData);
});

// Submits vote to the candidate/initiatives of choice
app.post("/submitVote", async function(req, res) {
    const { candidates, initiatives } = req.body;
    // WIP
    
    return res.status(200).send("Vote successfully submitted.");
});

// ----------------------------------------------------------------

app.listen(
    port,
    () => {console.log(`API alive at http://localhost:3000`)}
);
