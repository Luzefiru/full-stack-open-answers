import { Diagnosis } from '../types';
import diagnosesData from '../../data/diagnoses';

function getDiagnoses(): Diagnosis[] {
  return diagnosesData;
}

export default { getDiagnoses };
