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
importUsers('./data/members.psv');
function termconn(){
    CLIENT.end();
}