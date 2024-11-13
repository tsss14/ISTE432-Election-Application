const { Client } = require('pg');
const fs = require('fs'); //file system module 

let CLIENT;

function newConnection(uname, hname, db, pwd,){ //given the proper string paramaters, creates connection to db
     CLIENT = new Client({
        user: uname, //adminuser
        host: hname, //localhost
        database: db, //americandream[db]
        password: pwd, //adminpass
        port: 5432
    });
    CLIENT.connect();
}

    


async function getUserData(uname, pwd) { 
    const res = await CLIENT.query('SELECT * FROM get_user_login($1, $2)', [uname, pwd]);
	if(res.rows[0].name === uname) {
		return true;
	}
	else {
		return false;
	}
}

async function addUser(uname, role, fname, lname, phone) { 
    const res = await CLIENT.query(`insert into americandreamdb."User" (first_name, last_name, username, phone, role) values ('${fname}', '${lname}', '${uname}', '${phone}', '${role}');`);
	return res;
}

async function addSociety(name) { 
    const res = await CLIENT.query(`insert into americandreamdb."Society" (name) values ('${name}');`);
	return res;
}

async function addBallot(name, society_name, startDate) { 
	const societyID = CLIENT.query(`select society_id from americandreamdb."Society" where name = '${society_name}';`)
    const res = await CLIENT.query(`insert into americandreamdb."Election" (society_id, name, totalVotes, ballotCount, startsAt, endsAt) values ('${societyID}', '${name}', 0, 0, '${startDate}', '${endDate}');`);
	return res;
}

async function getElectionID(electionName) {
    return await CLIENT.query(`select election_id from americandreamdb."Election" where name = '${electionName}';`);
}

async function addOffice() {
    
}

async function addCandidate(name, desc, officeName) {
	const officeID = CLIENT.query(`select office_id from americandreamdb."Office" where officeName = '${officeName}';`)
	const res = await CLIENT.query(`insert into americandreamdb."Candidate" (candidateName, description, office_id) values ('${name}', '${desc}', ${officeID});`);
	return res;
}

async function addInitiative(name, desc, election_id) {
	const res = await CLIENT.query(`insert into americandreamdb."Initiative" (election_id, initName, description) values (${election_id}, '${name}', '${desc}');`);
	return res;
}

function insertSessionID(sessionID, role, timestamp) {
	CLIENT.query(`INSERT INTO americandreamdb.sessionids VALUES ('${sessionID}', '${role}', '${timestamp}');`);
}

async function getPreviousElections(){
    const res = await CLIENT.query(`SELCECT name, endsAT FROM americandream.election < NOW()`);
    return res;
}

async function getOngoingElections(){
    const res = await CLIENT.query(`SELCECT name, FROM americandream.election WHERE endsAT > NOW()`);
    return res;
}

async function getElection(){
    const res = await CLIENT.query(`SELCECT * FROM americandream.election`);
    return res;
}

// ---------------------------------------------------------------- Luke Functions

// Gets current active election for logged in member
async function getActiveElection(user_id) {
	const societyID = await CLIENT.query(`select society_id from americandreamdb."Assignment" where user_id = ${user_id}`);
    const currentDate = Date.now();
    const election = await CLIENT.query(`select * from americandreamdb."Election" where society_id = ${societyID} and ${currentDate} between startsAt and endsAt`);
	return election;
}

// Gets offices based on election id
async function getOffices(election_id) {
    const offices = await CLIENT.query(`select * from americandreamdb."Office" where election_id = ${election_id}`)
    return offices;
}

// Gets candidates based on office id
async function getCandidates(office_id) {
    const candidates = await CLIENT.query(`select * from americandreamdb."Candidate" where office_id = ${office_id}`)
    return candidates;
}

// Gets initiatives based on election id
async function getInitiatives(election_id) {
    const initiatives = await CLIENT.query(`select * from americandreamdb."Initiative" where election_id = ${election_id}`)
    return initiatives;
}

// Insert session ID (for logged-in users)
function insertSessionID(sessionID, userID, role) {
    const query = `
      INSERT INTO americanDreamDB."Session" ("session_id", "user_id", "role", "timestamp")
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
    `;
    CLIENT.query(query, [sessionID, userID, role]);
}

// Fetch currently logged-in users
async function getActiveUsers() {
    const res = await CLIENT.query('SELECT * FROM americanDreamDB."Session"');
    return res.rows;  
}

// Fetch active elections
async function getActiveElections() {
    const currentDate = new Date().toISOString().split('T')[0];
    const query = `
      SELECT * FROM americanDreamDB."Election"
      WHERE CURRENT_DATE BETWEEN "startsAt" AND "endsAt"
    `;
    const res = await CLIENT.query(query);
    return res.rows;
}
  
// Log query execution time
async function logQueryTime(query, params) {
    const start = Date.now(); 
    const res = await CLIENT.query(query, params); 
    const duration = Date.now() - start; 
    
    await CLIENT.query(`
      INSERT INTO americanDreamDB."QueryLogs" ("query", "duration_ms")
      VALUES ($1, $2)
    `, [query, duration]);
    
    return res;
}

// Get average query response time
async function getAvgQueryTime() {
    const res = await CLIENT.query(`
      SELECT AVG("duration_ms") AS avg_duration
      FROM americanDreamDB."QueryLogs"
    `);
    return res.rows[0].avg_duration || 0; // Return 0 if no query logs are found
  }
  
// ----------------------------------------------------------------

async function importUsers(filename){
    const data = fs.readFileSync(filename, 'utf8');
    const lines = data.split('\n');

    for (let line of lines) {
        let fields = line.split('|');
        
        let [u_id, fname, lname, uname, s_id, u_role] = fields;

        const query = `SELECT add_user($1, $2, $3, $4, $5, $6);`;

        try {
            await CLIENT.query(query, fields);
        } catch (error) {
            console.error('Error adding user:', error);
        }
        
    }
}
newConnection('postgres','localhost','americandream','adminpass');
//importUsers('./data/members.psv');
function termconn(){
    CLIENT.end();
}

module.exports = {  getUserData, insertSessionID, addUser, addSociety, addBallot, addCandidate,
                    addInitiative, getPreviousElections, getElection, getElectionID, getOngoingElections, getActiveElection, getOffices, getCandidates, getInitiatives, getActiveUsers, getActiveElections, logQueryTime, getAvgQueryTime};
