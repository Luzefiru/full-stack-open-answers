import axios, { AxiosError } from 'axios';
import { Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createEntry = async (id: string, object: unknown): Promise<any> => {
  try {
    const { data } = await axios.post<Patient>(
      `${apiBaseUrl}/patients/${id}/entries`,
      object
    );

    return data;
  } catch (err) {
    if (
      err !== undefined &&
      err instanceof AxiosError &&
      'response' in err &&
      err.response !== undefined
    )
      return err.response.data.error;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  createEntry,
};
