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

app.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

app.post('/api/notes', async (req, res, next) => {
  const note = new Note({
    content: req.body.content,
    important: req.body.important || false,
  });

  note
    .save()
    .then((savedNote) => {
      res.json(savedNote);
    })
    .catch((err) => next(err));
});

app.delete('/api/notes/:id', (req, res, next) => {
  const idToDelete = req.params.id;
  Note.findByIdAndDelete(idToDelete)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => {
      next(err);
    });
});

app.put('/api/notes/:id', (req, res, next) => {
  const idToUpdate = req.params.id;
  Note.findByIdAndUpdate(idToUpdate, req.body, {
    new: true,
    runValidators: true,
  })
    .then((newDoc) => {
      res.status(200).json(newDoc);
    })
    .catch((err) => next(err));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error('error.message', error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  return next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
