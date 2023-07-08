import express from 'express';
const router = express.Router();
import patientsService from '../services/patients.service';

router.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

router.get('/:id', (req, res) => {
  res.send(patientsService.getPatient(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const newPatient = patientsService.toNewPatientData(req.body);
    const createdPatient = patientsService.createPatient(newPatient);
    res.status(201).send(createdPatient);
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ error: err.message });
  }
});

export default router;
