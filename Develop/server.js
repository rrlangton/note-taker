const express = require('express');
const path = require('path');
const api = require('./Develop/public/assets/js/index.js');
const { randomUUID } = require('crypto');

const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

// note path to database
const notePath = path.resolve(__dirname, 'db', 'db.json');

// GET route for notes 
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/Develop/public/notes.html'))
});

// POST route for notes
app.post('/api/notes', (req, res) => {
    console.log(req.body);

        const { title, text } = req.body;
        if (req.body) {
            const newNote = {
                title,
                text,
                note_id: uuidv2(),
            };

            readAndAppend(newNote, './Develop/db/db.json');
            res.json('Successfully recorded the note');
        } else {
            res.error('Please include a title and text');
        };
});

// wildcard GET route to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/Develop/public/index.html'))
});

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`));

module.exports = notes;