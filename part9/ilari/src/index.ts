import express from 'express';
import cors from 'cors';
import diaryRouter from './routes/diaries';
const app = express();
app.use(express.json());
/* eslint-disable-next-line */
app.use(cors());

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
