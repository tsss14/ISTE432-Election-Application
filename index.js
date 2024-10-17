const app = require('express')();
require('./businessLayer');
const port = 8080;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/login/:username/:password", (req, res) => {
        const returnVal = validateLogin(req.params.password)
        if(returnVal === "") {
            return res.status(400).send("Bad password...");
        }
        return res.status(200).send(returnVal);
});

app.listen(
    port,
    () => {console.log(`API alive at http://localhost:${port}`)}
);