import { Patient } from '../types';
import patientsData from '../../data/patients';

function getPatients(): Omit<Patient, 'ssn'>[] {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
}

export default { getPatients };
