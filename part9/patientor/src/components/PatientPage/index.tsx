import { Patient } from '../../types';
import {
  FemaleOutlined,
  MaleOutlined,
  TransgenderOutlined,
} from '@mui/icons-material';
import EntryItem from './EntryItem';
import { useState, useEffect } from 'react';
import { Diagnosis, Entry } from '../../types';
import diagnosesService from '../../services/diagnoses';
import { Button } from '@mui/material';
import AddEntryForm from '../AddEntryForm';

interface PatientPageProps {
  patient: Patient | undefined;
}

function PatientPage({ patient }: PatientPageProps) {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [showingEntryForm, setShowingEntryForm] = useState<boolean>(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [type, setType] = useState<string>('');

  const toggleEntryForm = (type?: string) => {
    setType(type ?? '');
    setShowingEntryForm(!showingEntryForm);
  };

  useEffect(() => {
    setEntries(patient?.entries as Entry[]);
  }, [patient]);

  useEffect(() => {
    const getDiagnoses = async () => {
      const diagnoses: Diagnosis[] = await diagnosesService.getAllDiagnoses();
      setDiagnoses(diagnoses);
    };
    getDiagnoses();
  }, []);

  const genderIcon: JSX.Element =
    patient?.gender === 'female' ? (
      <FemaleOutlined />
    ) : patient?.gender === 'male' ? (
      <MaleOutlined />
    ) : (
      <TransgenderOutlined />
    );

  if (patient === undefined) {
    return (
      <div>
        <h1>Error 404: Patient not found</h1>
      </div>
    );
  }
  return (
    <div>
      <h1 style={{ display: 'flex', gap: '8px' }}>
        {patient.name}
        {genderIcon}
      </h1>

      {showingEntryForm && type === 'HealthCheck' ? (
        <AddEntryForm
          type="HealthCheck"
          toggleEntryForm={toggleEntryForm}
          id={patient.id}
          setEntries={setEntries}
        />
      ) : (
        <Button
          style={{ margin: '16px' }}
          variant="contained"
          color="primary"
          onClick={() => {
            toggleEntryForm('HealthCheck');
          }}
        >
          Add New Health Check
        </Button>
      )}

      {showingEntryForm && type === 'Hospital' ? (
        <AddEntryForm
          type="Hospital"
          toggleEntryForm={toggleEntryForm}
          id={patient.id}
          setEntries={setEntries}
        />
      ) : (
        <Button
          style={{ margin: '16px' }}
          variant="contained"
          color="secondary"
          onClick={() => {
            toggleEntryForm('Hospital');
          }}
        >
          Add New Hospital Entry
        </Button>
      )}

      <section style={{ marginTop: '24px' }}>
        <div>ssn: {patient?.ssn ?? 'no ssn available'}</div>
        <div>occupation: {patient?.occupation}</div>
      </section>

      <h2>entries</h2>
      {entries?.length === 0 ? 'no entries found' : ''}
      {entries?.map((entry) => (
        <EntryItem diagnoses={diagnoses} entry={entry} />
      ))}
    </div>
  );
}

export default PatientPage;
