import mysql from 'mysql';

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "official-quick-ink-reserve"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

export default db;
