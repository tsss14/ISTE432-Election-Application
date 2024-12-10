const { Client } = require('pg'); 
const bcrypt = require('bcrypt');

const client = new Client({
    user: 'postgres', 
    host: 'localhost', 
    database: 'americandream', 
    password: 'adminpass', 
    port: 5432, 
});

async function updatePassword(username, plainPassword) {
    try {
        await client.connect();
        const hashedPassword = await bcrypt.hash(plainPassword, 10); // hash password with bcrypt
        const query = `UPDATE americanDreamDB."User" SET password = $1 WHERE username = $2`;
        const values = [hashedPassword, username];

        const res = await client.query(query, values);
        console.log("Password updated successfully for user:", username);
    } catch (error) {
        console.error("Error updating password:", error);
    } finally {
        await client.end();
    }
}

// change these to update specific user
const username = "your_username"; 
const newPassword = "your_new_password"; 

updatePassword(username, newPassword);
