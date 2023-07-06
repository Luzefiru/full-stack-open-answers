import calculateBMI from './src/bmiCalculator';
import calculateExercises from './src/exerciseCalculator';

import express from 'express';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  try {
    const result = calculateBMI(height, weight);
    res.json(result);
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ error: err.message });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  try {
    const result = calculateExercises(
      daily_exercises as number[],
      target as number
    );
    res.json(result);
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ error: err.message });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log('Now listening on http://127.0.0.1:3002');
});
