import express from 'express';
import cors from 'cors';
import apiRouter from './src/routes/api.router';
const app = express();

// eslint-disable-next-line
app.use(cors());

app.use('/api', apiRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Now listening on http://127.0.0.1:${PORT}`);
});
