const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        // replace if your MySQL username is different
    password: 'J@imysql#1a',        // replace if your MySQL password is set
    database: 'guestbook'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Route to accept guestbook entries
app.post('/api/entries', (req, res) => {
    const { firstName, lastName, email, phone, message } = req.body;
    const sql = `INSERT INTO entries (first_name, last_name, email, phone, message) VALUES (?, ?, ?, ?, ?)`;

    db.query(sql, [firstName, lastName, email, phone, message], (err, result) => {
        if (err) {
            console.error('Error inserting into database:', err);
            res.status(500).send('Server error');
            return;
        }
        res.status(200).send('Entry saved successfully!');
    });
});

// Start server
app.listen(port, () => {
    console.log(res.send('Guestbook backend is running!'));
});


app.get('/', (req, res) => {
    res.send('Guestbook backend is running!');
  });