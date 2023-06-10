const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(express.static('build'));
app.use(cors());

const Note = require('./models/note');

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
];

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (req, res) => {
  Note.find({}).then((result) => {
    res.json(result);
  });
});

app.get('/api/notes/:id', (req, res) => {
  Note.findById(req.params.id).then((note) => {
    res.json(note);
  });
});

app.post('/api/notes', async (req, res) => {
  // catcher for invalid request data, must have req.body.content
  if (!req.body.content) {
    return res.status(400).json({
      error: 'content missing',
    });
  }

  const note = new Note({
    content: req.body.content,
    important: req.body.important || false,
  });

  note.save().then((savedNote) => {
    res.json(savedNote);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
