require('./dataLayer');

function validateLogin(username, password) {
    if(!/(?=.*\d)(?=.*[a-z])(?=.*[ !"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])(?=.*[A-Z]).{8,}/.test(req.params.password)) {
        return "";
    } else {
        newConnection();
        const dataReturn = getUserData();
        termconn();
        return dataReturn;
    }
}