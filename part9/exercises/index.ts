import calculateBMI from './src/bmiCalculator';

import express from 'express';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  try {
    const result = calculateBMI(height, weight);
    res.json(result);
  } catch (err) {
    res.json({ error: err.message });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log('Now listening on http://127.0.0.1:3002');
});
