import express from 'express';
const router = express.Router();
import diagnosesService from '../services/diagnoses.service';

router.get('/', (_req, res) => {
  res.send(diagnosesService.getDiagnoses());
});

export default router;
