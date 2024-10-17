const { Client } = require('pg');
let CLIENT;

function newConnection(uname, hname, db, pwd,){ //given the proper string paramaters, creates connection to db
     CLIENT = new Client({
        user: uname,
        host: hname, 
        database: db,
        password: pwd,
        port: 5432
    });
    CLIENT.connect();
}

    


function getUserData(uname, pwd) { 
    let info = [];
    CLIENT.query('SELECT * FROM get_user_login($1, $2)', [uname, pwd], (err, res) => {
        if(err) {
            console.error('Error getting data', err.stack);
        } else {
            if (res.rows.length > 0) {
                for( let i=0; i<= rows.length; i++){
                    info[i] = res.rows[i]; //i suppose you could just return results, idk we'll talk ab it
                } 
                return info;
            } else {
                console.log('no results');
                return "";
            }
        }
    })

}
function termconn(){
    CLIENT.end();
}