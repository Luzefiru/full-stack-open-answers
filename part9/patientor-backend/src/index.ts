import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses.router';
import patientsRouter from './routes/patients.router';
const app = express();

// eslint-disable-next-line
app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  res.send('pong!');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Now listening on http://127.0.0.1:${PORT}`);
});
