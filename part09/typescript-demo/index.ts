import { calculator, Operation } from './src/calculator';

import express from 'express';
const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('<h1>PONG!</h1>');
});

app.post('/calculate', (req, res) => {
  const { value1, value2, op } = req.body;

  if (!value1 || isNaN(Number(value1))) {
    return res.status(400).send({ error: 'malformatted input' });
  }

  if (!value2 || isNaN(Number(value2))) {
    return res.status(400).send({ error: 'malformatted input' });
  }

  const result = calculator(Number(value1), Number(value2), op as Operation);
  return res.send({ result });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log('Now listening on http://localhost:3003');
});
