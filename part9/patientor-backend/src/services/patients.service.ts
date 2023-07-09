import { Patient, NewPatient, Gender, Entry, Diagnosis } from '../types';
import patientsData from '../../data/patients';
import { v1 as uuid } from 'uuid';

function getPatients(): Patient[] {
  return patientsData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries, ssn }) => ({
      id,
      name,
      ssn,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
}

function getPatient(id: string): Patient | never {
  const result = patientsData.find((p) => p.id === id);
  if (result === undefined) {
    throw new Error('a patient with that id does not exist');
  }
  return result;
}

function createPatient(newPatientData: NewPatient): Omit<Patient, 'ssn'> {
  const newPatient = {
    /* eslint-disable */
    id: uuid(),
    ...newPatientData,
  };

  patientsData.push(newPatient);

  return newPatient;
}

function isString(arg: unknown | string): arg is string {
  if (typeof arg === 'string' || arg instanceof String) {
    return true;
  } else {
    return false;
  }
}

function isGender(arg: string | Gender): arg is Gender {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(arg);
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

function parseName(arg: unknown): string {
  if (!isString(arg)) {
    throw new TypeError('Name must be a string!');
  }

  return arg;
}

function parseSSN(arg: unknown): string {
  if (!isString(arg)) {
    throw new TypeError('SSN must be a string!');
  }

  return arg;
}

function parseOccupation(arg: unknown): string {
  if (!isString(arg)) {
    throw new TypeError('Occupation must be a string!');
  }

  return arg;
}

export function parseGender(arg: string): Gender {
  if (!isGender(arg)) {
    throw new Error("Gender must be 'male', 'female' or 'other'!");
  }

  return arg;
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

function isEntry(object: unknown | Entry): object is Entry {
  if (typeof object === 'object' && object !== null && 'type' in object) {
    if (
      !('description' in object || 'date' in object || 'specialist' in object)
    ) {
      return false;
    }
    return true;
  } else {
    return false;
  }
}

export function toNewEntry(object: unknown): Entry {
  if (!isEntry(object)) {
    throw new Error('Bad entry data!');
  }

  const newEntry: Entry = {
    ...object,
    id: uuid(),
    description: object.description,
    date: parseDate(object.date),
    specialist: object.specialist,
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
  };

  return newEntry;
}

export function toNewPatientData(object: any): NewPatient {
  if (
    !object.name ||
    !object.dateOfBirth ||
    !object.ssn ||
    !object.gender ||
    !object.occupation ||
    !object.entries
  ) {
    throw new Error('Missing input fields!');
  }

  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: [] as Entry[],
  };
  return newPatient;
}

function addEntry(id: string, newEntry: Entry): Patient {
  const targetPatient = patientsData.find((p) => p.id === id);
  if (targetPatient === undefined) {
    throw new Error('Patient with that ID does not exist');
  }

  targetPatient.entries.push(newEntry);

  return targetPatient;
}

export default {
  getPatients,
  getPatient,
  createPatient,
  toNewPatientData,
  toNewEntry,
  addEntry,
};
