const {getUserData, insertSessionID} = require('./dataLayer.js');
const uuid = require('uuid');

function generateSQLTimestamp() {
	const timestamp = Date.now();
	const date = new Date(timestamp);
	const formattedTimestamp = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
	console.log("Generated timestamp: " + formattedTimestamp);
	return formattedTimestamp;
}

async function validateLogin(username, password) {
    console.log("Validating login...");
    if(!/(?=.*\d)(?=.*[a-z])(?=.*[ !"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])(?=.*[A-Z]).{8,}/.test(password)) {
        return "";
    } else {
        console.log("Acceptable password... Checking database...")
        const isValidLogin = await getUserData(username, password);
        if(isValidLogin) {
        	const uid = uuid.v4();
        	insertSessionID(uid, 'member', generateSQLTimestamp());
        	return uid;
        } else {
        	return "";
        }
    }
}

async function createUser(uname, role, fname, lname, phone) {
    console.log("Attempting user creation...");
    if(false) {
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

module.exports = { validateLogin, createUser };
