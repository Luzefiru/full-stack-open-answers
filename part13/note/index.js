const express = require('express');
const app = express();
const { PORT } = require('./util/config');

const noteRouter = require('./controller/note.controller');
const userRouter = require('./controller/user.controller');
const loginRouter = require('./controller/login.controller');

app.use(express.json());

app.use('/api/notes', noteRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
