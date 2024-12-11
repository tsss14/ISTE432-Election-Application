//import { getUserData, insertSessionID, addUser, addSociety, getElections, getElection, addBallot, getElectionID, addInitiative, addCandidate, getLoggedInUsers, getActiveElections, getAvgQueryResponseTime, getAvgHttpResponseTime, getActiveElection, getOffices, getCandidates, getInitiatives } from './dataLayer.js';
const uuid = require('uuid');
const { updateName, getUserData, getUserEditData, fetchBallotData, getCandidatesForElection, fetchInitiativeData, fetchCandidateData, fetchActiveBallots, addOffice, insertSessionID, addUser, addSociety, getPreviousElections, getOngoingElections, getSocieties, getElection, addBallot, getElectionID, addInitiative, addCandidate, getLoggedInUsers, getActiveElections, getAvgQueryResponseTime, getAvgHttpResponseTime, getActiveElection, getOffices, getCandidates, getInitiatives, getProfile} = require('./dataLayer.js');
const bcrypt = require('bcrypt');

function generateSQLTimestamp() { 
	const timestamp = Date.now();
	const date = new Date(timestamp);
	const formattedTimestamp = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
	console.log("Generated timestamp: " + formattedTimestamp);
	return formattedTimestamp;
}

function checkInput(input) {
	return !/^\w+$/.test(input);
}

// --------------------- password hashing + login vvv
async function validateLogin(username, password) {
    console.log("Validating login...");
    const user = await getUserData(username); 
    if (!user) {
        console.log("User not found");
        return ""; 
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); 
    if (isPasswordValid) {
        console.log("Password is valid. Creating session...");
        const sessionID = uuid.v4();
        await insertSessionID(sessionID, user.role, generateSQLTimestamp());
        // return sessionID; 
        return {
            sessionID: sessionID,
            role: user.role
        };
    } else {
        console.log("Invalid password");
        return "";
    }
}

function validatePasswordComplexity(password) {
    const complexPasswordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[ !"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])(?=.*[A-Z]).{8,}/;
    return complexPasswordRegex.test(password);
}

async function registerUser(username, role, firstName, lastName, phone, password) {
    if (!validatePasswordComplexity(password)) {
        throw new Error(
            "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long."
        );
    }
    return await addUser(username, role, firstName, lastName, phone, password);
}

// --------------------- password hashing + login ^^^

async function createUser(uname, role, fname, lname, phone) {
    console.log("Attempting user creation...");
    if(checkInput(uname) ||
    	checkInput(role) ||
    	checkInput(fname) ||
    	checkInput(lname) ||
    	checkInput(phone)
    ) {
        return "";
    } else {
        console.log("Acceptable field values... Querying database...")
        const userAdded = await addUser(uname, role, fname, lname, phone);
        if(userAdded) {
        	return true;
        } else {
        	return "";
        }
    }
}

async function callPreviousElections() {
    console.log("fetching elections");
    result =  await getPreviousElections();
    //console.log(result);
    return result;
}
async function callOngoingElections() {
    console.log("fetching elections");
    result =  await getOngoingElections();
    //console.log(result);
    return result;
}

async function callSocieties() {
    console.log('fetching your societies');
    result = await getSocieties();
    //console.log(result);
    return result;
}

async function getActiveBallots() {
    const res = await fetchActiveBallots();
    if(res === -1) return -1;
    return res;
}

async function getBallotData(election_id) {
    const res = await fetchBallotData(election_id);
    if(res === -1) return -1;
    return res;
}

async function getInitiativeData(election_id) {
    const res = await getInitiatives(election_id);
    if(res === -1) return -1;
    return res;
}

async function getCandidateData(election_id) {
    const res = await getCandidatesForElection(election_id);
    if(res === -1) return -1;
    return res;
}

async function callElection(election_id) {
    console.log("fetching Election data");
    result = await getElection(election_id);
    return result;
}

async function callProfile(user_id) {
    console.log("fetching profile data");
    result = await getProfile(user_id);
    return result;
}
  
async function createSociety(socName) {
    console.log("Attempting society creation...");
    if(checkInput(socName)) {
        return "";
    } else {
        console.log("Acceptable field values... Querying database...")
        const socAdded = await addSociety(socName);
        if(socAdded) {
        	return true;
        } else {
        	return "";
        }
    }
}

async function createOffice(officeName, elecName) {
    if(checkInput(officeName)) {
        return -1;
    } else {
        await addOffice(officeName, elecName);
        return 1;
    }
}

async function createBallot(socName, elecName) {
    console.log("Attempting ballot creation...");
    if(false) {
        return "";
    } else {
        console.log("Acceptable field values... Querying database...")
        let start = generateSQLTimestamp();
        addBallot(socName, elecName, start);
        return true;
    }
}

async function populateBallot(elecName, cndts, inits) {
    console.log("Attempting ballot population...");
    if(false) {
        return "";
    } else {
        console.log("Acceptable field values... Querying database...")
        console.log(elecName);
        let elecID = await getElectionID(elecName);
        console.log(inits);
        console.log(cndts);
        inits.forEach((init) => {
            addInitiative(init.name, init.description, elecID.rows[0].election_id);
        });
        cndts.forEach((cndt) => {
            addCandidate(cndt.name, cndt.description, cndt.office);
        });
        return true;
    }
}

// ---------------------------------------------------------------- Luke Functions

// Gets & consolidates system stats
async function getSystemStats() {
    const loggedInUsers = await getLoggedInUsers();
    const activeElections = await getActiveElections();
    const avgQueryTime = await getAvgQueryResponseTime();
    const avgHttpTime = await getAvgHttpResponseTime();

    return {
        loggedInUsers,
        activeElections,
        avgQueryTime,
        avgHttpTime
    };
}

// Gets & consolidates all active election info by user
async function getActiveElectionByUser(user_id) {
    const election = await getActiveElection(user_id);
    const offices = await getOffices(election.election_id);
    const candidates = await getCandidates(offices.office_id);
    const initiatives = await getInitiatives(election.election_id);
    return {election, offices, candidates, initiatives};
}

// Gets & consolidates all active election info by user (revision)
async function getElectionData(user_id) {
    const election = await getActiveElection(user_id);
    if (!election) return null;

    const offices = await getOffices(election.election_id);
    const candidatesPromises = offices.map(office => getCandidates(office.office_id));
    const candidates = await Promise.all(candidatesPromises);

    const initiatives = await getInitiatives(election.election_id);

    return {
        election,
        offices,
        candidates: [].concat(...candidates),  
        initiatives
    };
}

// ----------------------------------------------------------------

async function getUser(username) {
    const userdata = await getUserEditData(username);
    return userdata;
}

async function switchName(first, last, username) {
    await updateName(first, last, username);
}

module.exports = {
    switchName,
    getUser,
    validateLogin,
    validatePasswordComplexity,
    registerUser,
    createUser, 
    createSociety, 
    createBallot,
    populateBallot, 
    callElection, 
    callPreviousElections,
    callOngoingElections,
    getSystemStats,
    getActiveElectionByUser,
    getElectionData,
    createOffice,
    callSocieties,
    callProfile,
    getActiveBallots,
    getBallotData,
    getInitiativeData,
    getCandidateData
    };
