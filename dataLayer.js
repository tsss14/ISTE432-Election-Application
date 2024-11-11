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

async function addBallot(name, society_name, startDate, endDate) { 
	const societyID = CLIENT.query(`select society_id from americandreamdb."Society" where name = '${society_name}';`)
    const res = await CLIENT.query(`insert into americandreamdb."Election" (society_id, name, totalVotes, ballotCount, startsAt, endsAt) values ('${societyID}', '${name}', 0, 0, '${startDate}', '${endDate}');`);
	return res;
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

async function getElections(){
    const res = await CLIENT.query(`SELCECT name, endsAT FROM americandream.election`);
    return res;
}

async function getElection(){
    const res = await CLIENT.query(`SELCECT * FROM americandream.election`);
    return res;
}

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

module.exports = {getUserData, insertSessionID, addUser, addSociety, addBallot, addCandidate, addInitiative};
