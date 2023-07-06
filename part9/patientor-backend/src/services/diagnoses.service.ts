import { Diagnose } from '../types';
import diagnosesData from '../../data/diagnoses';

function getDiagnoses(): Diagnose[] {
  return diagnosesData;
}

export default { getDiagnoses };
