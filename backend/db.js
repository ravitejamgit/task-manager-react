require('dotenv').config()
const mysql = require('mysql2/promise')


const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

async function getData() {
    try {
        const [data] = await db.query('select * from data');
        console.log(data);
    }
    catch(error) {
        console.log('error in fetching data', error);
    }
}


getData();
db.end(() => {console.log('Connections ended.')});
