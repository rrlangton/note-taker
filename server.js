const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3001;
const {readFromFile, readAndAppend} = require('./helpers/fsUtils');
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// note path to database
const notePath = path.resolve(__dirname, 'db', 'db.json');

// GET route for notes 
app.get('/api/notes', (req, res) => {
    readFromFile ('./db/db.json').then(note => {
        res.json(JSON.parse(note))})
});

// POST route for notes
app.post('/api/notes', (req, res) => {
    console.log(req.body);

        const { title, text } = req.body;
        if (req.body) {
            const newNote = {
                title,
                text,
                id: uuidv4(),
            };

            const parsedData = readAndAppend(newNote, './db/db.json');
            res.json(parsedData);
        } else {
            res.error('Please include a title and text');
        };
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});
// wildcard GET route to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`));
