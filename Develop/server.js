const express = require('express');
const path = require('path');
const api = require('./')

const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

// note path to database
const notePath = path.resolve(__dirname, 'db', 'db.json');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/Develop/public/notes.html'))
})

// wildcard route to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/Develop/public/index.html'))
});

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`))

module.exports = notes;