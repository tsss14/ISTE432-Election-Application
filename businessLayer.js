const {getUserData} = require('./dataLayer.js');

async function validateLogin(username, password) {
    console.log("Validating login...");
    if(!/(?=.*\d)(?=.*[a-z])(?=.*[ !"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])(?=.*[A-Z]).{8,}/.test(password)) {
        return "";
    } else {
        console.log("Acceptable password... Checking database...")
        const dataReturn = await getUserData(username, password);
        return dataReturn;
    }
}

module.exports = { validateLogin };
