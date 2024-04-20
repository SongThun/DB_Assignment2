import mysql from 'mysql2'

let db = null;

const createDatabase = async (username, password) => {
    if (db) db.end((err) => console.log(err));

    db = mysql.createPool({
        user: username,
        host: 'localhost',
        password: password, 
        database: 'badminton_court_db'
    }).promise()

    try {
        const result = await db.query('select court_id from court');
        return 'success'
    }
    catch(err) {
        return err;
    }
    
}
const connect = () => {
    return db;
}

export {connect, createDatabase}