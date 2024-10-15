const app = require('express')();
const port = 8080;

const mockUsers = [
    { 
        "id" : 1 ,
        "username" : "test1",
        "password" : "!testPass1"
    },

    { 
        "id" : 2 ,
        "username" : "test2",
        "password" : "!testPass2"
    },

    { 
        "id" : 3 ,
        "username" : "test3",
        "password" : "!testPass3"
    }
]

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/login/:username/:password", (req, res) => {
        if(!/(?=.*\d)(?=.*[a-z])(?=.*[ !"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])(?=.*[A-Z]).{8,}/.test(req.params.password)) {
            return res.status(400).send("Bad password...");
        }
        return res.status(200).send(mockUsers.find((user) => user.username === req.params.username && user.password === req.params.password));
});

app.listen(
    port,
    () => {console.log(`API alive at http://localhost:${port}`)}
);