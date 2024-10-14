const app = require('express')();
const port = 8080;

const mockUsers = [
    { 
        "id" : 1 ,
        "username" : "test1",
        "password" : "testPass1"
    },

    { 
        "id" : 2 ,
        "username" : "test2",
        "password" : "testPass2"
    },

    { 
        "id" : 3 ,
        "username" : "test2",
        "password" : "testPass2"
    }
]

app.listen(
    port,
    () => {console.log(`API alive at http://localhost:${port}`)}
)