const fs = require('fs'); //file system module

function importUsers(filename){
    const data = fs.readFileSync(filename, 'utf8');
    const lines = data.split('\n');

    for (let line of lines) {
        let fields = line.split('|');
        
        let [u_id, fname, lname, uname, s_id, u_role] = fields;
        
    }
}