import axios from 'axios';
import { Diagnosis } from '../types';
import { apiBaseUrl } from '../constants';

const getAllDiagnoses = async (): Promise<Diagnosis[]> => {
  const response = await axios.get(`${apiBaseUrl}/diagnoses`);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllDiagnoses };
