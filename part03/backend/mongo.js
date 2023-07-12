const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(process.argv);
  console.log('give password as argument');
  process.exit(1);
}

async function connectToMongoDB() {
  const password = process.argv[2];
  const url = `mongodb+srv://admin:${password}@fso-cluster.lumsjv5.mongodb.net/noteApp?retryWrites=true&w=majority`;

  mongoose.set('strictQuery', false);
  await mongoose.connect(url);
}
connectToMongoDB();

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

Note.find({ important: true }).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
