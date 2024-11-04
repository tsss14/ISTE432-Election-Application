const express = require('express');
const app = express();
const {validateLogin, createUser} = require('./businessLayer.js');
const port = 3000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());

app.post("/login", async function(req, res) {
	console.log(req.body);
	const uname = req.body.username;
	const pwrd = req.body.password;
        const returnVal = await validateLogin(uname, pwrd);
        if(returnVal === "") {
            return res.status(400).send("Bad password...");
        }
        return res.status(200).send(returnVal);
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

app.listen(
    port,
    () => {console.log(`API alive at http://localhost:3000`)}
);
