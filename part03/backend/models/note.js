require('dotenv').config();

const mongoose = require('mongoose');
const url = process.env.MONGODB_CONNECTION_STRING;
mongoose.set('strictQuery', false);
mongoose.connect(url).then(console.log('MongoDB connected'));

const noteSchema = new mongoose.Schema({
  content: { type: String, required: true, minLength: 5 },
  important: Boolean,
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
