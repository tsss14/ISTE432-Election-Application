import { getUserData, insertSessionID, addUser, addSociety, getElections, getElection } from './dataLayer.js';
import { v4 } from 'uuid';

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

async function validateLogin(username, password) {
    console.log("Validating login...");
    if(!/(?=.*\d)(?=.*[a-z])(?=.*[ !"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])(?=.*[A-Z]).{8,}/.test(password)) {
        return "";
    } else {
        console.log("Acceptable password... Checking database...")
        const isValidLogin = await getUserData(username, password);
        if(isValidLogin) {
        	const uid = v4();
        	insertSessionID(uid, 'member', generateSQLTimestamp());
        	return uid;
        } else {
        	return "";
        }
    }
}

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

  async function callElections() {
    console.log("fetching elections");
    result =  await getElections();
    console.log(result);
    return JSON.parse(result);
}

async function callElection() {
    console.log("fetching Election data");
    result = await getElection();
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

async function createBallot(socName, elecName, cndts, inits, start, durr, desc) {
    console.log("Attempting ballot creation...");
    if(checkInput(socName) ||
    	checkInput(elecName) ||
    	checkInput(cndts) ||
    	checkInput(inits) ||
        checkInput(start) ||
        checkInput(durr) ||
    	checkInput(desc)) {
        return "";
    } else {
        console.log("Acceptable field values... Querying database...")
	//Call a function multiple times to add each candidate and initiative
	//Finally call a function to create the ballot itself 
        //const ballotAdded = await addSociety(socName);
        if(ballotAdded) {
        	return true;
        } else {
        	return "";
        }
    }
}

module.exports = { 
    validateLogin,
    createUser, 
    createSociety, 
    createBallot, 
    callElection, 
    callElections };
