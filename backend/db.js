const mysql = require('mysql2');

const db_connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'root',
    database: 'task_manager'
});

db_connection.connect((error)=>{
    if(error) {
        console.log("Failed to conned to database..");
        return;
    }
    console.log("Connected to Database....");
})

module.exports = db_connection;