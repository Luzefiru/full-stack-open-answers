import { Patient, NewPatient, Gender } from '../types';
import patientsData from '../../data/patients';
import { v1 as uuid } from 'uuid';

function getPatients(): Omit<Patient, 'ssn'>[] {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
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

export function toNewPatientData(object: any): NewPatient {
  if (
    !object.name ||
    !object.dateOfBirth ||
    !object.ssn ||
    !object.gender ||
    !object.occupation
  ) {
    throw new Error('Missing input fields!');
  }

  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };
  return newPatient;
}

export default { getPatients, createPatient, toNewPatientData };
