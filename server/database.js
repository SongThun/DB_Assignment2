import mysql from 'mysql2'

const db = mysql.createPool({
    user: 'root',
    host: 'localhost',
    password: '206206',
    database: 'badminton'
})

export default db;