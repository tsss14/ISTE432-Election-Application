const app = require('express')();
const {validateLogin} = require('./businessLayer.js');
const port = 3000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/login/:username/:password", async function(req, res) {
        const returnVal = await validateLogin(req.params.username, req.params.password);
        if(returnVal === "") {
            return res.status(400).send("Bad password...");
        }
        console.log(returnVal);
        return res.status(200).json(returnVal);
});

app.listen(
    port,
    () => {console.log(`API alive at http://localhost:3000`)}
);
