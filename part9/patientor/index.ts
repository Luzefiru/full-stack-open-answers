import express from 'express';
const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Now listening on http://127.0.0.1:${PORT}`);
});
